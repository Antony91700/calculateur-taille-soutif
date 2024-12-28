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

export const cmToBraSize = (underBust: number, bust: number): BraSize | null => {
  if (underBust < 63 || underBust > 108 || bust < 76 || bust > 132) {
    return null;
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
  
  const band = bandSizes[underBust] || null;
  if (!band || cupIndex < 0 || cupIndex >= cupSizes.length) {
    return null;
  }

  return {
    band,
    cup: cupSizes[cupIndex]
  };
};

export const braSizeToCm = (band: number, cup: string): { underBust: number[], bust: number[] } | null => {
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cupIndex = cupSizes.indexOf(cup);
  
  if (cupIndex === -1 || ![70, 75, 80, 85, 90, 95, 100, 105, 110].includes(band)) {
    return null;
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
): BraSize | null => {
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
