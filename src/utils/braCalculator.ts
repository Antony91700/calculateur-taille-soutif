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

type Result = BraSize | { error: string };

export const cmToBraSize = (underBust: number, bust: number): Result => {
  console.log("Entrée cmToBraSize:", { underBust, bust });
  
  // Validation des mesures
  if (underBust < 63 || underBust > 108) {
    return { error: "Le tour de dessous de poitrine doit être entre 63 et 108 cm" };
  }
  if (bust < 76 || bust > 132) {
    return { error: "Le tour de poitrine doit être entre 76 et 132 cm" };
  }
  if (bust <= underBust) {
    return { error: "Le tour de poitrine doit être plus grand que le tour de dessous de poitrine" };
  }

  // Calcul de la taille de bande
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

  const roundedUnderBust = Math.round(underBust);
  const band = bandSizes[roundedUnderBust];
  
  if (!band) {
    return { error: "Tour de dessous de poitrine non standard" };
  }

  // Calcul de la taille de bonnet
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const difference = bust - underBust;
  const cupIndex = Math.floor(difference / 2.5) - 4;

  if (cupIndex < 0 || cupIndex >= cupSizes.length) {
    return { error: "Différence de mesures hors limites pour le calcul du bonnet" };
  }

  console.log("Résultat cmToBraSize:", { band, cup: cupSizes[cupIndex] });
  return {
    band,
    cup: cupSizes[cupIndex]
  };
};

export const braSizeToCm = (band: number, cup: string): { underBust: [number, number], bust: [number, number] } | { error: string } => {
  console.log("Entrée braSizeToCm:", { band, cup });
  
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cupIndex = cupSizes.indexOf(cup);
  
  if (cupIndex === -1) {
    return { error: "Taille de bonnet invalide" };
  }

  if (![70, 75, 80, 85, 90, 95, 100, 105, 110].includes(band)) {
    return { error: "Tour de dos invalide" };
  }

  // Calcul des plages de mesures
  const underBustRanges: { [key: number]: [number, number] } = {
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

  const underBustRange = underBustRanges[band];
  const cupDifference = (cupIndex + 4) * 2.5;
  const bustRange: [number, number] = [
    Math.round(underBustRange[0] + cupDifference),
    Math.round(underBustRange[1] + cupDifference)
  ];

  console.log("Résultat braSizeToCm:", { underBustRange, bustRange });
  return {
    underBust: underBustRange,
    bust: bustRange
  };
};

export const calculateAdvancedBraSize = (
  underBustMeasurements: ThreeMeasurements,
  bustMeasurements: BustMeasurements
): Result => {
  console.log("Entrée calculateAdvancedBraSize:", { underBustMeasurements, bustMeasurements });
  
  // Validation des mesures
  const allMeasurements = [
    ...Object.values(underBustMeasurements),
    ...Object.values(bustMeasurements)
  ];

  if (allMeasurements.some(m => m < 63 || m > 132)) {
    return { error: "Toutes les mesures doivent être entre 63 et 132 cm" };
  }

  // Calcul des moyennes pondérées
  const weightedUnderBust = 
    underBustMeasurements.tight * 0.2 +
    underBustMeasurements.snug * 0.5 +
    underBustMeasurements.loose * 0.3;

  const weightedBust = 
    bustMeasurements.standing * 0.3 +
    bustMeasurements.leaning * 0.4 +
    bustMeasurements.lying * 0.3;

  console.log("Moyennes pondérées:", { weightedUnderBust, weightedBust });
  return cmToBraSize(weightedUnderBust, weightedBust);
};