import React from 'react'

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  if (!result) return null;

  return (
    <div className="mt-6 p-6 bg-pink-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-pink-900">Résultat :</h3>
      <p className="whitespace-pre-line text-pink-800">{result}</p>
    </div>
  );
};

export default ResultDisplay;