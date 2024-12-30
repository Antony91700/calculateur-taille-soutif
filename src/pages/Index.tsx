import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import BraSizeCalculator from '@/components/BraSizeCalculator';

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <ThemeToggle />
        <div className="max-w-2xl mx-auto space-y-8">
          <BraSizeCalculator />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;