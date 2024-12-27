import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cmToBraSize, braSizeToCm } from '@/utils/braCalculator';

const Index = () => {
  const { toast } = useToast();
  const [underBust, setUnderBust] = useState('');
  const [bust, setBust] = useState('');
  const [bandSize, setBandSize] = useState('');
  const [cupSize, setCupSize] = useState('');
  const [result, setResult] = useState<string>('');

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

  return (
    <div className="min-h-screen bg-pink-light p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-pink-dark">Calculateur de Taille de Soutien-gorge</CardTitle>
            <CardDescription>Convertissez vos mesures en taille ou vice versa</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cm" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cm">Mesures → Taille</TabsTrigger>
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

              <TabsContent value="size" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bandSize">Tour de bande</Label>
                    <Select onValueChange={setBandSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le tour de bande" />
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