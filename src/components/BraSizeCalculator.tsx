import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdvancedMeasurementForm from '@/components/AdvancedMeasurementForm'
import SimpleMeasurementForm from '@/components/SimpleMeasurementForm'
import BraSizeMeasurementForm from '@/components/BraSizeMeasurementForm'
import ResultDisplay from '@/components/ResultDisplay'
import { useBraSizeCalculator } from '@/hooks/useBraSizeCalculator'

const BraSizeCalculator = () => {
  const {
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
  } = useBraSizeCalculator();

  return (
    <Card className="bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Calculateur de Taille de Soutien-gorge
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Convertissez vos mesures en taille ou vice versa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cm" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cm">Mesure Simple</TabsTrigger>
            <TabsTrigger value="advanced">Mesure Avancée</TabsTrigger>
            <TabsTrigger value="size">Mesure du soutien-gorge</TabsTrigger>
          </TabsList>

          <TabsContent value="cm">
            <SimpleMeasurementForm
              underBust={underBust}
              setUnderBust={setUnderBust}
              bust={bust}
              setBust={setBust}
              onCalculate={handleCmCalculation}
            />
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

          <TabsContent value="size">
            <BraSizeMeasurementForm
              bandSize={bandSize}
              setBandSize={setBandSize}
              cupSize={cupSize}
              setCupSize={setCupSize}
              onCalculate={handleSizeCalculation}
            />
          </TabsContent>
        </Tabs>

        <ResultDisplay result={result} />
      </CardContent>
    </Card>
  );
};

export default BraSizeCalculator;