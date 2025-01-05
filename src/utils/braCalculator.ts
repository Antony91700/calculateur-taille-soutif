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
  
  // Élargissement des limites de validation
  if (underBust < 60 || underBust > 120) {
    return { error: "Le tour de dessous de poitrine doit être entre 60 et 120 cm" };
  }
  if (bust < 70 || bust > 150) {
    return { error: "Le tour de poitrine doit être entre 70 et 150 cm" };
  }
  if (bust <= underBust) {
    return { error: "Le tour de poitrine doit être plus grand que le tour de dessous de poitrine" };
  }

  // Calcul de la taille de bande
  const bandSizes: { [key: number]: number } = {
    60: 65, 61: 65, 62: 65, 63: 65, 64: 65, 65: 65, 66: 65, 67: 65,
    68: 70, 69: 70, 70: 70, 71: 70, 72: 70,
    73: 75, 74: 75, 75: 75, 76: 75, 77: 75,
    78: 80, 79: 80, 80: 80, 81: 80, 82: 80,
    83: 85, 84: 85, 85: 85, 86: 85, 87: 85,
    88: 90, 89: 90, 90: 90, 91: 90, 92: 90,
    93: 95, 94: 95, 95: 95, 96: 95, 97: 95,
    98: 100, 99: 100, 100: 100, 101: 100, 102: 100,
    103: 105, 104: 105, 105: 105, 106: 105, 107: 105,
    108: 110, 109: 110, 110: 110, 111: 110, 112: 110,
    113: 115, 114: 115, 115: 115, 116: 115, 117: 115,
    118: 120, 119: 120, 120: 120
  };

  const roundedUnderBust = Math.round(underBust);
  const band = bandSizes[roundedUnderBust];
  
  if (!band) {
    return { error: "Tour de dessous de poitrine non standard" };
  }

  // Calcul de la taille de bonnet avec plus de tailles
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
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
  
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const cupIndex = cupSizes.indexOf(cup);
  
  if (cupIndex === -1) {
    return { error: "Taille de bonnet invalide" };
  }

  // Plages de mesures ajustées pour correspondre aux tailles standard
  const underBustRanges: { [key: number]: [number, number] } = {
    65: [60, 67],
    70: [68, 72],
    75: [73, 77],
    80: [78, 82],
    85: [83, 87],
    90: [88, 92],
    95: [93, 97],
    100: [98, 102],
    105: [103, 107],
    110: [108, 112],
    115: [113, 117],
    120: [118, 120]
  };

  const underBustRange = underBustRanges[band];
  if (!underBustRange) {
    return { error: "Tour de dos invalide" };
  }

  // Calcul ajusté pour la correspondance avec cmToBraSize
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