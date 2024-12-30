import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cmToBraSize, braSizeToCm, calculateAdvancedBraSize } from '@/utils/braCalculator';
import AdvancedMeasurementForm from '@/components/AdvancedMeasurementForm';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeProvider } from 'next-themes';

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

    const result = cmToBraSize(ub, b);
    if ('error' in result) {
      toast({
        title: "Mesures hors limites",
        description: result.error,
        variant: "destructive"
      });
      return;
    }

    setResult(`Votre taille de soutien-gorge est : ${result.band}${result.cup}`);
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

    const result = braSizeToCm(parseInt(bandSize), cupSize);
    if ('error' in result) {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive"
      });
      return;
    }

    setResult(`Tour de dessous de poitrine : ${result.underBust[0]}-${result.underBust[1]} cm\nTour de poitrine : ${result.bust[0]}-${result.bust[1]} cm`);
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

    if (Object.values(underBustMeasurements).some(isNaN) || Object.values(bustMeasurements).some(isNaN)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer toutes les mesures requises",
        variant: "destructive"
      });
      return;
    }

    const result = calculateAdvancedBraSize(underBustMeasurements, bustMeasurements);
    if ('error' in result) {
      toast({
        title: "Mesures hors limites",
        description: result.error,
        variant: "destructive"
      });
      return;
    }

    setResult(`Votre taille de soutien-gorge est : ${result.band}${result.cup}`);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <ThemeToggle />
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Calculateur de Taille de Soutien-gorge</CardTitle>
              <CardDescription className="text-muted-foreground">Convertissez vos mesures en taille ou vice versa</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cm" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cm">Mesure Simple</TabsTrigger>
                  <TabsTrigger value="advanced">Mesure Avancée</TabsTrigger>
                  <TabsTrigger value="size">Mesure du soutien-gorge</TabsTrigger>
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

                <TabsContent value="advanced">
                  <AdvancedMeasurementForm
                    tightUnderBust={tightUnderBust}
                    setTightUnderBust={setTightUnderBust}
                    looseUnderBust={looseUnderBust}
                    setLooseUnderBust={setLooseUnderBust}
                    snugUnderBust={snugUnderBust}
                    setSnugUnderBust={setSnugUnderBust}
                    standingBust={standingBust}
                    setStandingBust={setStandingBust}
                    leaningBust={leaningBust}
                    setLeaningBust={setLeaningBust}
                    lyingBust={lyingBust}
                    setLyingBust={setLyingBust}
                    onCalculate={handleAdvancedCalculation}
                  />
                </TabsContent>

                <TabsContent value="size" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bandSize">Quelle est la taille de ton soutien-gorge actuel ?</Label>
                      <Select onValueChange={setBandSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisis ta taille" />
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
                      <Label htmlFor="cupSize">Quelle taille de bonnet portes-tu ?</Label>
                      <Select onValueChange={setCupSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisis ton bonnet" />
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
                <div className="mt-6 p-4 bg-pink-50 rounded-lg text-center">
                  <p className="whitespace-pre-line">{result}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
