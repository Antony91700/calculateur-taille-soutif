import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SimpleMeasurementFormProps {
  underBust: string
  setUnderBust: (value: string) => void
  bust: string
  setBust: (value: string) => void
  onCalculate: () => void
}

const SimpleMeasurementForm = ({
  underBust,
  setUnderBust,
  bust,
  setBust,
  onCalculate
}: SimpleMeasurementFormProps) => {
  return (
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
      <Button onClick={onCalculate} className="bg-pink-dark hover:bg-pink">
        Calculer la taille
      </Button>
    </div>
  )
}

export default SimpleMeasurementForm