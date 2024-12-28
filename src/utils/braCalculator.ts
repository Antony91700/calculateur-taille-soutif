type BraSize = {
  band: number;
  cup: string;
};

type ThreeMeasurements = {
  tight: number;
  loose: number;
  snug: number;
};

type BustMeasurements = {
  standing: number;
  leaning: number;
  lying: number;
};

const validateMeasurement = (measurement: number, min: number, max: number, name: string): string | null => {
  if (measurement < min) {
    return `La mesure ${name} (${measurement} cm) est trop petite. Elle doit être d'au moins ${min} cm.`;
  }
  if (measurement > max) {
    return `La mesure ${name} (${measurement} cm) est trop grande. Elle doit être au maximum de ${max} cm.`;
  }
  return null;
};

export const cmToBraSize = (underBust: number, bust: number): BraSize | { error: string } => {
  const underBustError = validateMeasurement(underBust, 63, 108, "du tour de dessous de poitrine");
  if (underBustError) return { error: underBustError };

  const bustError = validateMeasurement(bust, 76, 132, "du tour de poitrine");
  if (bustError) return { error: bustError };

  if (bust <= underBust) {
    return { error: "Le tour de poitrine doit être plus grand que le tour de dessous de poitrine" };
  }

  const bandSizes: { [key: number]: number } = {
    63: 70, 64: 70, 67: 70,
    68: 75, 69: 75, 72: 75,
    73: 80, 74: 80, 77: 80,
    78: 85, 79: 85, 82: 85,
    83: 90, 84: 90, 87: 90,
    88: 95, 89: 95, 92: 95,
    93: 100, 94: 100, 97: 100,
    98: 105, 99: 105, 102: 105,
    103: 110, 104: 110, 107: 110
  };

  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const difference = bust - underBust;
  const cupIndex = Math.floor(difference / 2.5) - 4;
  
  const band = bandSizes[underBust];
  if (!band) {
    return { error: `Le tour de dessous de poitrine de ${underBust} cm ne correspond à aucune taille standard` };
  }

  if (cupIndex < 0 || cupIndex >= cupSizes.length) {
    return { error: `La différence de ${difference} cm entre le tour de poitrine et le tour de dessous de poitrine est hors limites` };
  }

  return {
    band,
    cup: cupSizes[cupIndex]
  };
};

export const braSizeToCm = (band: number, cup: string): { underBust: number[], bust: number[] } | { error: string } => {
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cupIndex = cupSizes.indexOf(cup);
  
  if (cupIndex === -1) {
    return { error: `La taille de bonnet ${cup} n'est pas valide. Les tailles valides sont : ${cupSizes.join(', ')}` };
  }

  if (![70, 75, 80, 85, 90, 95, 100, 105, 110].includes(band)) {
    return { error: `Le tour de dos ${band} n'est pas valide. Les tailles valides sont : 70, 75, 80, 85, 90, 95, 100, 105, 110` };
  }

  const underBustRanges: { [key: number]: number[] } = {
    70: [63, 67],
    75: [68, 72],
    80: [73, 77],
    85: [78, 82],
    90: [83, 87],
    95: [88, 92],
    100: [93, 97],
    105: [98, 102],
    110: [103, 107]
  };

  const cupDifference = (cupIndex + 4) * 2.5;
  const underBustRange = underBustRanges[band];
  const bustRange = underBustRange.map(ub => ub + cupDifference);

  return {
    underBust: underBustRange,
    bust: bustRange
  };
};

export const calculateAdvancedBraSize = (
  underBustMeasurements: ThreeMeasurements,
  bustMeasurements: BustMeasurements
): BraSize | { error: string } => {
  // Validation des mesures du tour de dos
  const underBustErrors = [
    validateMeasurement(underBustMeasurements.tight, 63, 108, "serrée du tour de dos"),
    validateMeasurement(underBustMeasurements.snug, 63, 108, "ajustée du tour de dos"),
    validateMeasurement(underBustMeasurements.loose, 63, 108, "non-serrée du tour de dos")
  ].filter(error => error !== null);

  if (underBustErrors.length > 0) {
    return { error: underBustErrors[0]! };
  }

  // Validation des mesures de la poitrine
  const bustErrors = [
    validateMeasurement(bustMeasurements.standing, 76, 132, "debout de la poitrine"),
    validateMeasurement(bustMeasurements.leaning, 76, 132, "penchée de la poitrine"),
    validateMeasurement(bustMeasurements.lying, 76, 132, "allongée de la poitrine")
  ].filter(error => error !== null);

  if (bustErrors.length > 0) {
    return { error: bustErrors[0]! };
  }

  // Calcul de la mesure sous-poitrine finale (moyenne pondérée)
  const finalUnderBust = (
    underBustMeasurements.tight * 0.2 +
    underBustMeasurements.snug * 0.5 +
    underBustMeasurements.loose * 0.3
  );

  // Calcul de la mesure de poitrine finale (moyenne pondérée)
  const finalBust = (
    bustMeasurements.standing * 0.3 +
    bustMeasurements.leaning * 0.4 +
    bustMeasurements.lying * 0.3
  );

  return cmToBraSize(finalUnderBust, finalBust);
};