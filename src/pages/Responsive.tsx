import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import BraSizeCalculatorResponsive from '@/components/BraSizeCalculatorResponsive';

const Responsive = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <ThemeToggle />
        <div className="max-w-full sm:max-w-2xl mx-auto space-y-4">
          <BraSizeCalculatorResponsive />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Responsive;