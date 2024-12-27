import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      // Sauvegarder l'API key si elle est fournie
      if (apiKey) {
        FirecrawlService.saveApiKey(apiKey);
      }

      const savedApiKey = FirecrawlService.getApiKey();
      if (!savedApiKey) {
        toast({
          title: "Erreur",
          description: "Veuillez d'abord entrer votre clé API",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      console.log('Début de l\'analyse pour l\'URL:', url);
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success) {
        toast({
          title: "Succès",
          description: "Site web analysé avec succès",
          duration: 3000,
        });
        setCrawlResult(result.data);
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Échec de l'analyse du site",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse du site:', error);
      toast({
        title: "Erreur",
        description: "Échec de l'analyse du site",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Clé API Firecrawl
          </label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            placeholder="Entrez votre clé API Firecrawl"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            URL du site web
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            placeholder="https://example.com"
            required
          />
        </div>
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200"
        >
          {isLoading ? "Analyse en cours..." : "Démarrer l'analyse"}
        </Button>
      </form>

      {crawlResult && (
        <Card className="mt-6 p-4">
          <h3 className="text-lg font-semibold mb-2">Résultats de l'analyse</h3>
          <div className="space-y-2 text-sm">
            <p>Statut : {crawlResult.status}</p>
            <p>Pages complétées : {crawlResult.completed}</p>
            <p>Total des pages : {crawlResult.total}</p>
            <p>Crédits utilisés : {crawlResult.creditsUsed}</p>
            <p>Expire le : {new Date(crawlResult.expiresAt || '').toLocaleString()}</p>
            {crawlResult.data && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Données analysées :</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto max-h-60">
                  {JSON.stringify(crawlResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};