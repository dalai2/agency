import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/30',
    accent: 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/30',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;


