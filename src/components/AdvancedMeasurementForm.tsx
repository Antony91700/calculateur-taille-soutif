import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MeasurementInstructions from './MeasurementInstructions';

interface AdvancedMeasurementFormProps {
  tightUnderBust: string;
  setTightUnderBust: (value: string) => void;
  looseUnderBust: string;
  setLooseUnderBust: (value: string) => void;
  snugUnderBust: string;
  setSnugUnderBust: (value: string) => void;
  standingBust: string;
  setStandingBust: (value: string) => void;
  leaningBust: string;
  setLeaningBust: (value: string) => void;
  lyingBust: string;
  setLyingBust: (value: string) => void;
  onCalculate: () => void;
}

const AdvancedMeasurementForm = ({
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
  onCalculate
}: AdvancedMeasurementFormProps) => {
  return (
    <div className="space-y-4">
      <MeasurementInstructions />
      <div className="space-y-4">
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
        <Button onClick={onCalculate} className="bg-pink-dark hover:bg-pink w-full">
          Calculer la taille
        </Button>
      </div>
    </div>
  );
};

export default AdvancedMeasurementForm;