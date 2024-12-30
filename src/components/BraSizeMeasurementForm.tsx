import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface BraSizeMeasurementFormProps {
  bandSize: string
  setBandSize: (value: string) => void
  cupSize: string
  setCupSize: (value: string) => void
  onCalculate: () => void
}

const BraSizeMeasurementForm = ({
  bandSize,
  setBandSize,
  cupSize,
  setCupSize,
  onCalculate
}: BraSizeMeasurementFormProps) => {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="bandSize">Quelle est la taille de ton soutien-gorge actuel ?</Label>
        <Select onValueChange={setBandSize} value={bandSize}>
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
        <Select onValueChange={setCupSize} value={cupSize}>
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
      <Button onClick={onCalculate} className="bg-pink-dark hover:bg-pink">
        Obtenir les mesures
      </Button>
    </div>
  )
}

export default BraSizeMeasurementForm