import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { cmToBraSize, braSizeToCm, calculateAdvancedBraSize } from '@/utils/braCalculator';

export const useBraSizeCalculator = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<string>('');

  // Mesures simples
  const [underBust, setUnderBust] = useState('');
  const [bust, setBust] = useState('');
  const [bandSize, setBandSize] = useState('');
  const [cupSize, setCupSize] = useState('');

  // Mesures avancées
  const [tightUnderBust, setTightUnderBust] = useState('');
  const [looseUnderBust, setLooseUnderBust] = useState('');
  const [snugUnderBust, setSnugUnderBust] = useState('');
  const [standingBust, setStandingBust] = useState('');
  const [leaningBust, setLeaningBust] = useState('');
  const [lyingBust, setLyingBust] = useState('');

  const handleCmCalculation = () => {
    if (!underBust || !bust) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer toutes les mesures requises",
        variant: "destructive"
      });
      return;
    }

    const ub = parseFloat(underBust);
    const b = parseFloat(bust);
    
    if (isNaN(ub) || isNaN(b)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des mesures valides",
        variant: "destructive"
      });
      return;
    }

    const calculatedResult = cmToBraSize(ub, b);
    console.log("Résultat du calcul simple:", calculatedResult);
    
    if ('error' in calculatedResult) {
      toast({
        title: "Mesures hors limites",
        description: calculatedResult.error,
        variant: "destructive"
      });
      return;
    }

    setResult(`Votre taille de soutien-gorge est : ${calculatedResult.band}${calculatedResult.cup}`);
  };

  const handleSizeCalculation = () => {
    if (!bandSize || !cupSize) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une taille complète",
        variant: "destructive"
      });
      return;
    }

    console.log("Calcul à partir de la taille:", { bandSize, cupSize });
    const calculatedResult = braSizeToCm(parseInt(bandSize), cupSize);
    console.log("Résultat du calcul de taille:", calculatedResult);
    
    if ('error' in calculatedResult) {
      toast({
        title: "Erreur",
        description: calculatedResult.error,
        variant: "destructive"
      });
      return;
    }

    setResult(
      `Tour de dessous de poitrine : ${calculatedResult.underBust[0]}-${calculatedResult.underBust[1]} cm\n` +
      `Tour de poitrine : ${calculatedResult.bust[0]}-${calculatedResult.bust[1]} cm`
    );
  };

  const handleAdvancedCalculation = () => {
    if (!tightUnderBust || !looseUnderBust || !snugUnderBust || 
        !standingBust || !leaningBust || !lyingBust) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer toutes les mesures requises",
        variant: "destructive"
      });
      return;
    }

    const underBustMeasurements = {
      tight: parseFloat(tightUnderBust),
      loose: parseFloat(looseUnderBust),
      snug: parseFloat(snugUnderBust)
    };

    const bustMeasurements = {
      standing: parseFloat(standingBust),
      leaning: parseFloat(leaningBust),
      lying: parseFloat(lyingBust)
    };

    console.log("Mesures avancées:", { underBustMeasurements, bustMeasurements });

    if (Object.values(underBustMeasurements).some(isNaN) || 
        Object.values(bustMeasurements).some(isNaN)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des mesures valides",
        variant: "destructive"
      });
      return;
    }

    const calculatedResult = calculateAdvancedBraSize(underBustMeasurements, bustMeasurements);
    console.log("Résultat du calcul avancé:", calculatedResult);
    
    if ('error' in calculatedResult) {
      toast({
        title: "Mesures hors limites",
        description: calculatedResult.error,
        variant: "destructive"
      });
      return;
    }

    setResult(`Votre taille de soutien-gorge est : ${calculatedResult.band}${calculatedResult.cup}`);
  };

  return {
    result,
    underBust,
    setUnderBust,
    bust,
    setBust,
    bandSize,
    setBandSize,
    cupSize,
    setCupSize,
    tightUnderBust,
    setTightUnderBust,
    looseUnderBust,
    setLooseUnderBust,
    snugUnderBust,
    setSnugUnderBust,
    standingBust,
    setStandingBust,
    leaningBust,
    setLeaningBust,
    lyingBust,
    setLyingBust,
    handleCmCalculation,
    handleSizeCalculation,
    handleAdvancedCalculation
  };
};