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
  
  // Limites de validation selon la norme AFNOR française
  if (underBust < 63 || underBust > 122) {
    return { error: "Le tour de dessous de poitrine doit être entre 63 et 122 cm" };
  }
  if (bust < 70 || bust > 150) {
    return { error: "Le tour de poitrine doit être entre 70 et 150 cm" };
  }
  if (bust <= underBust) {
    return { error: "Le tour de poitrine doit être plus grand que le tour de dessous de poitrine" };
  }

  // Calcul de la taille de bande selon la norme AFNOR française
  const bandSizes: { [key: number]: number } = {
    63: 80, 64: 80, 65: 80, 66: 80, 67: 80,
    68: 85, 69: 85, 70: 85, 71: 85, 72: 85,
    73: 90, 74: 90, 75: 90, 76: 90, 77: 90,
    78: 95, 79: 95, 80: 95, 81: 95, 82: 95,
    83: 100, 84: 100, 85: 100, 86: 100, 87: 100,
    88: 105, 89: 105, 90: 105, 91: 105, 92: 105,
    93: 110, 94: 110, 95: 110, 96: 110, 97: 110,
    98: 115, 99: 115, 100: 115, 101: 115, 102: 115,
    103: 120, 104: 120, 105: 120, 106: 120, 107: 120,
    108: 125, 109: 125, 110: 125, 111: 125, 112: 125,
    113: 130, 114: 130, 115: 130, 116: 130, 117: 130,
    118: 135, 119: 135, 120: 135, 121: 135, 122: 135
  };

  const roundedUnderBust = Math.round(underBust);
  const band = bandSizes[roundedUnderBust];
  
  if (!band) {
    return { error: "Tour de dessous de poitrine non standard" };
  }

  // Calcul de la taille de bonnet avec plus de tailles
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const difference = bust - underBust;
  const cupIndex = Math.round((difference - 13) / 2) + 1;

  if (cupIndex < 0 || cupIndex >= cupSizes.length) {
    return { error: "Différence de mesures hors limites pour le calcul du bonnet" };
  }

  console.log("Résultat cmToBraSize:", { band, cup: cupSizes[cupIndex] });
  return {
    band,
    cup: cupSizes[cupIndex]
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

  if (allMeasurements.some(m => m < 60 || m > 150)) {
    return { error: "Toutes les mesures doivent être entre 60 et 150 cm" };
  }

  // Vérification de la cohérence des mesures sous-poitrine
  if (underBustMeasurements.tight > underBustMeasurements.snug || 
      underBustMeasurements.snug > underBustMeasurements.loose) {
    return { error: "Les mesures sous-poitrine ne sont pas cohérentes. La mesure serrée doit être la plus petite, suivie de la mesure ajustée, puis de la mesure non-serrée." };
  }

  // Calcul des moyennes pondérées avec plus d'importance sur la mesure ajustée
  const weightedUnderBust = 
    underBustMeasurements.tight * 0.2 +
    underBustMeasurements.snug * 0.6 +  // Augmentation du poids de la mesure ajustée
    underBustMeasurements.loose * 0.2;

  // Moyenne pondérée des mesures de poitrine
  const weightedBust = 
    bustMeasurements.standing * 0.3 +
    bustMeasurements.leaning * 0.4 +    // Plus de poids sur la mesure penchée
    bustMeasurements.lying * 0.3;

  console.log("Moyennes pondérées:", { weightedUnderBust, weightedBust });

  // Vérification supplémentaire de la cohérence
  if (weightedBust <= weightedUnderBust) {
    return { error: "Le tour de poitrine moyen doit être plus grand que le tour sous-poitrine moyen" };
  }

  return cmToBraSize(weightedUnderBust, weightedBust);
};

export const braSizeToCm = (band: number, cup: string): { underBust: [number, number], bust: [number, number] } | { error: string } => {
  console.log("Entrée braSizeToCm:", { band, cup });
  
  const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const cupIndex = cupSizes.indexOf(cup);
  
  if (cupIndex === -1) {
    return { error: "Taille de bonnet invalide" };
  }

  // Plages de mesures selon la norme AFNOR française
  const underBustRanges: { [key: number]: [number, number] } = {
    80: [63, 67],
    85: [68, 72],
    90: [73, 77],
    95: [78, 82],
    100: [83, 87],
    105: [88, 92],
    110: [93, 97],
    115: [98, 102],
    120: [103, 107],
    125: [108, 112],
    130: [113, 117],
    135: [118, 122]
  };

  const underBustRange = underBustRanges[band];
  if (!underBustRange) {
    return { error: "Tour de dos invalide" };
  }

  // Calcul AFNOR : bonnet A = +13 cm, puis +2 cm par taille
  const baseDiff = 13; // point de départ bonnet A
  const step = 2;      // incrément par bonnet
  const cupDifferenceMin = baseDiff + (cupIndex - 1) * step;
  const cupDifferenceMax = cupDifferenceMin + step;

  const bustRange: [number, number] = [
    Math.round(underBustRange[0] + cupDifferenceMin),
    Math.round(underBustRange[1] + cupDifferenceMax)
  ];

  console.log("Résultat braSizeToCm:", { underBustRange, bustRange });
  return {
    underBust: underBustRange,
    bust: bustRange
  };
};
