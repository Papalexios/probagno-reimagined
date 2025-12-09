import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function Logo({ className = '', size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: { container: 'gap-2', icon: 'w-9 h-9', text: 'text-base', tagline: 'text-[7px]', letter: 'text-sm' },
    md: { container: 'gap-3', icon: 'w-11 h-11', text: 'text-lg', tagline: 'text-[9px]', letter: 'text-base' },
    lg: { container: 'gap-4', icon: 'w-16 h-16', text: 'text-2xl', tagline: 'text-[11px]', letter: 'text-xl' },
  };

  return (
    <Link to="/" className={`flex items-center ${sizes[size].container} group ${className}`}>
      {/* Premium Logo Mark - Layered Geometric Design */}
      <motion.div 
        className={`${sizes[size].icon} relative`}
        whileHover={{ scale: 1.08, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Outer glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/30 via-primary/20 to-stone-600/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main container - rounded square */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 rounded-xl shadow-2xl overflow-hidden">
          {/* Diagonal luxury stripe */}
          <div className="absolute -inset-full rotate-45 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          
          {/* Top accent line */}
          <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          
          {/* Inner elegant border */}
          <div className="absolute inset-[3px] rounded-lg border border-amber-500/20" />
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-amber-400/40 rounded-tl" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-amber-400/40 rounded-br" />
        
        {/* Letter P - Elegant serif with gradient */}
        <motion.span 
          className={`absolute inset-0 flex items-center justify-center font-serif ${sizes[size].letter} font-bold`}
          style={{
            background: 'linear-gradient(135deg, #f5f5f4 0%, #d6d3d1 50%, #a8a29e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          P
        </motion.span>
      </motion.div>
      
      {/* Brand Name - Premium Typography */}
      <div className="flex flex-col">
        <motion.div className="relative overflow-hidden">
          <motion.span 
            className={`font-display ${sizes[size].text} font-semibold tracking-[0.25em] bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600 dark:from-stone-100 dark:via-stone-200 dark:to-stone-300 bg-clip-text text-transparent`}
            whileHover={{ letterSpacing: '0.3em' }}
            transition={{ duration: 0.4 }}
          >
            PROBAGNO
          </motion.span>
          {/* Underline accent on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
        {showTagline && (
          <motion.span 
            className={`${sizes[size].tagline} tracking-[0.4em] text-stone-500 dark:text-stone-400 uppercase mt-0.5 font-light`}
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, letterSpacing: '0.45em' }}
            transition={{ duration: 0.3 }}
          >
            Depuis 1974
          </motion.span>
        )}
      </div>
    </Link>
  );
}

export default Logo;