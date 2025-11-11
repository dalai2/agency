import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false 
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-light' : 'bg-white';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;








