import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact' | 'footer';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all",
          "bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700",
          "text-stone-600 dark:text-stone-300",
          className
        )}
      >
        <span className={cn(language === 'el' && "text-primary font-semibold")}>ΕΛ</span>
        <span className="text-stone-300 dark:text-stone-600">/</span>
        <span className={cn(language === 'en' && "text-primary font-semibold")}>EN</span>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <button
          onClick={() => setLanguage('el')}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
            language === 'el'
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "text-primary-foreground/60 hover:text-primary-foreground"
          )}
        >
          Ελληνικά
        </button>
        <span className="text-primary-foreground/30">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
            language === 'en'
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "text-primary-foreground/60 hover:text-primary-foreground"
          )}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative flex items-center bg-stone-100 dark:bg-stone-800 rounded-full p-0.5", className)}>
      <motion.div
        className="absolute h-[calc(100%-4px)] w-[calc(50%-2px)] bg-white dark:bg-stone-700 rounded-full shadow-sm"
        animate={{ x: language === 'el' ? 2 : 'calc(100% + 2px)' }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      
      <button
        onClick={() => setLanguage('el')}
        className={cn(
          "relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          language === 'el' 
            ? "text-stone-800 dark:text-stone-100" 
            : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
        )}
      >
        <span className="text-base">🇬🇷</span>
        <span className="hidden sm:inline">ΕΛ</span>
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          language === 'en' 
            ? "text-stone-800 dark:text-stone-100" 
            : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
        )}
      >
        <span className="text-base">🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
}
