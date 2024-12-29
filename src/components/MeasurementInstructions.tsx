import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const MeasurementInstructions = () => {
  return (
    <Card className="mt-4 bg-pink-50">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-lg text-pink-dark">Guide des mesures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="font-medium">Tour de dessous de poitrine :</p>
            <div className="text-center">
              <img 
                src="/lovable-uploads/9e2e898f-495b-4834-94ff-470a12ca2134.png" 
                alt="Mesure 1-2-3"
                className="mx-auto h-40 object-contain"
              />
              <p className="text-sm mt-1">
                1: Mesure non-serrée<br/>
                2: Mesure ajustée<br/>
                3: Mesure serrée
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Tour de poitrine :</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="text-center">
                <img 
                  src="/lovable-uploads/a52eb87d-f093-4521-b109-1110888d3879.png" 
                  alt="Mesure 4"
                  className="mx-auto h-40 object-contain"
                />
                <p className="text-sm mt-1">4: Mesure debout</p>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/4e8f0a05-ce0d-4135-95ed-2fd7c1c3e844.png" 
                  alt="Mesure 5"
                  className="mx-auto h-40 object-contain"
                />
                <p className="text-sm mt-1">5: Mesure penchée</p>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/918ef4d7-fd07-4379-bf9d-529383128304.png" 
                  alt="Mesure 6"
                  className="mx-auto h-40 object-contain"
                />
                <p className="text-sm mt-1">6: Mesure allongée</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementInstructions;