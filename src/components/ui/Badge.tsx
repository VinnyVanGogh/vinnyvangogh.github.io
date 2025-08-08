import React from 'react';

interface BadgeProps {
  variant?: 'skill' | 'metric' | 'status' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'skill',
  size = 'md',
  children,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const variantClasses = {
    skill: 'bg-platinum/20 text-platinum border border-platinum/30',
    metric: 'bg-champagne/20 text-champagne border border-champagne/30',
    status: 'bg-metallic-silver/20 text-metallic-silver border border-metallic-silver/30',
    highlight: 'bg-gradient-to-r from-champagne/20 to-platinum/20 text-white border border-white/30'
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;