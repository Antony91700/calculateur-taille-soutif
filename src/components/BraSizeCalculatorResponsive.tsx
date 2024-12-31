import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdvancedMeasurementForm from './AdvancedMeasurementForm'
import SimpleMeasurementForm from './SimpleMeasurementForm'
import BraSizeMeasurementForm from './BraSizeMeasurementForm'
import ResultDisplay from './ResultDisplay'
import { useBraSizeCalculator } from '@/hooks/useBraSizeCalculator'

const BraSizeCalculatorResponsive = () => {
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
    <Card className="bg-card shadow-lg">
      <CardHeader className="text-center p-4">
        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
          Calculateur de Taille de Soutien-gorge
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground">
          Convertissez vos mesures en taille ou vice versa
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <Tabs defaultValue="cm" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="cm" className="text-xs sm:text-sm">Mesure Simple</TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs sm:text-sm">Mesure Avancée</TabsTrigger>
            <TabsTrigger value="size" className="text-xs sm:text-sm">Taille actuelle</TabsTrigger>
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

export default BraSizeCalculatorResponsive;