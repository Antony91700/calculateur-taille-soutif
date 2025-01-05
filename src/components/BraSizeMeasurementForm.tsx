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
        <Select 
          onValueChange={setBandSize} 
          value={bandSize}
          name="bandSize"
        >
          <SelectTrigger 
            id="bandSize"
            className="w-full bg-background text-foreground border-input touch-manipulation"
          >
            <SelectValue placeholder="Choisis ta taille" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            className="bg-background border-input max-h-[200px] overflow-y-auto touch-manipulation z-50"
            sideOffset={0}
          >
            {[70, 75, 80, 85, 90, 95, 100, 105, 110].map((size) => (
              <SelectItem 
                key={size} 
                value={size.toString()}
                className="hover:bg-accent hover:text-accent-foreground cursor-pointer py-3 px-2"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cupSize">Quelle taille de bonnet portes-tu ?</Label>
        <Select 
          onValueChange={setCupSize} 
          value={cupSize}
          name="cupSize"
        >
          <SelectTrigger 
            id="cupSize"
            className="w-full bg-background text-foreground border-input touch-manipulation"
          >
            <SelectValue placeholder="Choisis ton bonnet" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            className="bg-background border-input max-h-[200px] overflow-y-auto touch-manipulation z-50"
            sideOffset={0}
          >
            {['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((size) => (
              <SelectItem 
                key={size} 
                value={size}
                className="hover:bg-accent hover:text-accent-foreground cursor-pointer py-3 px-2"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={onCalculate} 
        className="bg-pink-dark hover:bg-pink text-white w-full"
      >
        Obtenir les mesures
      </Button>
    </div>
  )
}

export default BraSizeMeasurementForm