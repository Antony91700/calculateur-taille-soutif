import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cmToBraSize, braSizeToCm, calculateAdvancedBraSize } from '@/utils/braCalculator';

const Index = () => {
  const { toast } = useToast();
  // Mesures simples
  const [underBust, setUnderBust] = useState('');
  const [bust, setBust] = useState('');
  const [bandSize, setBandSize] = useState('');
  const [cupSize, setCupSize] = useState('');
  const [result, setResult] = useState<string>('');

  // Mesures avancées
  const [tightUnderBust, setTightUnderBust] = useState('');
  const [looseUnderBust, setLooseUnderBust] = useState('');
  const [snugUnderBust, setSnugUnderBust] = useState('');
  const [standingBust, setStandingBust] = useState('');
  const [leaningBust, setLeaningBust] = useState('');
  const [lyingBust, setLyingBust] = useState('');

  const handleCmCalculation = () => {
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

    const braSize = cmToBraSize(ub, b);
    if (!braSize) {
      toast({
        title: "Mesures hors limites",
        description: "Les mesures entrées sont en dehors des plages valides",
        variant: "destructive"
      });
      return;
    }

    setResult(`Votre taille de soutien-gorge est : ${braSize.band}${braSize.cup}`);
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

    const measurements = braSizeToCm(parseInt(bandSize), cupSize);
    if (!measurements) {
      toast({
        title: "Erreur",
        description: "Taille invalide",
        variant: "destructive"
      });
      return;
    }

    setResult(`Tour de dessous de poitrine : ${measurements.underBust[0]}-${measurements.underBust[1]} cm\nTour de poitrine : ${measurements.bust[0]}-${measurements.bust[1]} cm`);
  };

  const handleAdvancedCalculation = () => {
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

    // Vérification que toutes les mesures sont valides
    if (Object.values(underBustMeasurements).some(isNaN) || Object.values(bustMeasurements).some(isNaN)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer toutes les mesures requises",
        variant: "destructive"
      });
      return;
    }

    const braSize = calculateAdvancedBraSize(underBustMeasurements, bustMeasurements);
    if (!braSize) {
      toast({
        title: "Mesures hors limites",
        description: "Les mesures entrées sont en dehors des plages valides",
        variant: "destructive"
      });
      return;
    }

    setResult(`Votre taille de soutien-gorge est : ${braSize.band}${braSize.cup}`);
  };

  return (
    <div className="min-h-screen bg-pink-light p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-pink-dark">Calculateur de Taille de Soutien-gorge</CardTitle>
            <CardDescription>Convertissez vos mesures en taille ou vice versa</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cm" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cm">Mesure Simple</TabsTrigger>
                <TabsTrigger value="advanced">Mesure Avancée</TabsTrigger>
                <TabsTrigger value="size">Taille → Mesures</TabsTrigger>
              </TabsList>

              <TabsContent value="cm" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="underBust">Tour de dessous de poitrine (cm)</Label>
                    <Input
                      id="underBust"
                      type="number"
                      value={underBust}
                      onChange={(e) => setUnderBust(e.target.value)}
                      placeholder="63-108 cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bust">Tour de poitrine (cm)</Label>
                    <Input
                      id="bust"
                      type="number"
                      value={bust}
                      onChange={(e) => setBust(e.target.value)}
                      placeholder="76-132 cm"
                    />
                  </div>
                  <Button onClick={handleCmCalculation} className="bg-pink-dark hover:bg-pink">
                    Calculer la taille
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Tour de dessous de poitrine</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tightUnderBust">Mesure serrée (cm)</Label>
                        <Input
                          id="tightUnderBust"
                          type="number"
                          value={tightUnderBust}
                          onChange={(e) => setTightUnderBust(e.target.value)}
                          placeholder="Mesure très serrée"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="snugUnderBust">Mesure ajustée (cm)</Label>
                        <Input
                          id="snugUnderBust"
                          type="number"
                          value={snugUnderBust}
                          onChange={(e) => setSnugUnderBust(e.target.value)}
                          placeholder="Mesure confortable"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="looseUnderBust">Mesure non-serrée (cm)</Label>
                        <Input
                          id="looseUnderBust"
                          type="number"
                          value={looseUnderBust}
                          onChange={(e) => setLooseUnderBust(e.target.value)}
                          placeholder="Mesure lâche"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Tour de poitrine</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="standingBust">Mesure debout (cm)</Label>
                        <Input
                          id="standingBust"
                          type="number"
                          value={standingBust}
                          onChange={(e) => setStandingBust(e.target.value)}
                          placeholder="Debout, droite"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leaningBust">Mesure penchée (cm)</Label>
                        <Input
                          id="leaningBust"
                          type="number"
                          value={leaningBust}
                          onChange={(e) => setLeaningBust(e.target.value)}
                          placeholder="Penchée en avant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lyingBust">Mesure allongée (cm)</Label>
                        <Input
                          id="lyingBust"
                          type="number"
                          value={lyingBust}
                          onChange={(e) => setLyingBust(e.target.value)}
                          placeholder="Allongée sur le dos"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleAdvancedCalculation} className="bg-pink-dark hover:bg-pink">
                    Calculer la taille
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="size" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bandSize">Tour sous poitrine</Label>
                    <Select onValueChange={setBandSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le tour sous poitrine" />
                      </SelectTrigger>
                      <SelectContent>
                        {[70, 75, 80, 85, 90, 95, 100, 105, 110].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cupSize">Bonnet</Label>
                    <Select onValueChange={setCupSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la taille du bonnet" />
                      </SelectTrigger>
                      <SelectContent>
                        {['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSizeCalculation} className="bg-pink-dark hover:bg-pink">
                    Obtenir les mesures
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {result && (
              <div className="mt-6 p-4 bg-pink-light rounded-lg text-center">
                <p className="whitespace-pre-line">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
