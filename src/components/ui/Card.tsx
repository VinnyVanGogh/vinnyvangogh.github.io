import React from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'glass';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  onClick
}) => {
  const baseClasses = 'rounded-xl p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-onyx-metallic/50 border border-metallic-silver/10',
    elevated: 'bg-onyx-metallic/70 shadow-xl hover:shadow-2xl hover:scale-[1.02]',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10'
  };

  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h3 className={`text-xl font-bold text-white ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <p className={`text-metallic-silver/80 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mt-4 pt-4 border-t border-metallic-silver/10 ${className}`}>
    {children}
  </div>
);

export default Card;