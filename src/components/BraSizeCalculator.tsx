import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { cmToBraSize, braSizeToCm, calculateAdvancedBraSize } from '@/utils/braCalculator'
import AdvancedMeasurementForm from '@/components/AdvancedMeasurementForm'
import SimpleMeasurementForm from '@/components/SimpleMeasurementForm'
import BraSizeMeasurementForm from '@/components/BraSizeMeasurementForm'

const BraSizeCalculator = () => {
  const { toast } = useToast()
  
  // Mesures simples
  const [underBust, setUnderBust] = useState('')
  const [bust, setBust] = useState('')
  const [bandSize, setBandSize] = useState('')
  const [cupSize, setCupSize] = useState('')
  const [result, setResult] = useState<string>('')

  // Mesures avancées
  const [tightUnderBust, setTightUnderBust] = useState('')
  const [looseUnderBust, setLooseUnderBust] = useState('')
  const [snugUnderBust, setSnugUnderBust] = useState('')
  const [standingBust, setStandingBust] = useState('')
  const [leaningBust, setLeaningBust] = useState('')
  const [lyingBust, setLyingBust] = useState('')

  const handleCmCalculation = () => {
    if (!underBust || !bust) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer toutes les mesures requises",
        variant: "destructive"
      })
      return
    }

    const ub = parseFloat(underBust)
    const b = parseFloat(bust)
    
    if (isNaN(ub) || isNaN(b)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des mesures valides",
        variant: "destructive"
      })
      return
    }

    const calculatedResult = cmToBraSize(ub, b)
    if ('error' in calculatedResult) {
      toast({
        title: "Mesures hors limites",
        description: calculatedResult.error,
        variant: "destructive"
      })
      return
    }

    setResult(`Votre taille de soutien-gorge est : ${calculatedResult.band}${calculatedResult.cup}`)
  }

  const handleSizeCalculation = () => {
    if (!bandSize || !cupSize) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une taille complète",
        variant: "destructive"
      })
      return
    }

    const calculatedResult = braSizeToCm(parseInt(bandSize), cupSize)
    if ('error' in calculatedResult) {
      toast({
        title: "Erreur",
        description: calculatedResult.error,
        variant: "destructive"
      })
      return
    }

    setResult(`Tour de dessous de poitrine : ${calculatedResult.underBust[0]}-${calculatedResult.underBust[1]} cm
Tour de poitrine : ${calculatedResult.bust[0]}-${calculatedResult.bust[1]} cm`)
  }

  const handleAdvancedCalculation = () => {
    if (!tightUnderBust || !looseUnderBust || !snugUnderBust || 
        !standingBust || !leaningBust || !lyingBust) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer toutes les mesures requises",
        variant: "destructive"
      })
      return
    }

    const underBustMeasurements = {
      tight: parseFloat(tightUnderBust),
      loose: parseFloat(looseUnderBust),
      snug: parseFloat(snugUnderBust)
    }

    const bustMeasurements = {
      standing: parseFloat(standingBust),
      leaning: parseFloat(leaningBust),
      lying: parseFloat(lyingBust)
    }

    if (Object.values(underBustMeasurements).some(isNaN) || 
        Object.values(bustMeasurements).some(isNaN)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des mesures valides",
        variant: "destructive"
      })
      return
    }

    const calculatedResult = calculateAdvancedBraSize(underBustMeasurements, bustMeasurements)
    if ('error' in calculatedResult) {
      toast({
        title: "Mesures hors limites",
        description: calculatedResult.error,
        variant: "destructive"
      })
      return
    }

    setResult(`Votre taille de soutien-gorge est : ${calculatedResult.band}${calculatedResult.cup}`)
  }

  return (
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

        {result && (
          <div className="mt-6 p-4 bg-pink-50 rounded-lg text-center">
            <p className="whitespace-pre-line">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BraSizeCalculator