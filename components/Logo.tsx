import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-10',
    md: 'w-10 h-12',
    lg: 'w-16 h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const subtextSizes = {
    sm: 'text-[0.5rem]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Shield with V */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Shield background */}
          <path
            d="M50 5L10 25V60C10 85 30 110 50 115C70 110 90 85 90 60V25L50 5Z"
            fill="#2E4354"
            stroke="#2E4354"
            strokeWidth="2"
          />
          {/* V letter */}
          <path
            d="M30 35L50 80L70 35H60L50 60L40 35H30Z"
            fill="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Brand name and tagline */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${textSizes[size]} font-exo2 font-bold text-dark uppercase tracking-wide`}>
            VELANT
          </span>
          <span className={`${subtextSizes[size]} font-exo2 font-medium text-dark/80 uppercase tracking-wider`}>
            AGENCIA DIGITAL
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;



