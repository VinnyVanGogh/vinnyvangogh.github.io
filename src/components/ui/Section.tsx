import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id
}) => {
  return (
    <section
      id={id}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <h2 className={`text-4xl md:text-5xl font-bold text-gradient mb-4 ${className}`}>
    {children}
  </h2>
);

export const SectionSubtitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <p className={`text-lg md:text-xl text-metallic-silver/80 mb-12 ${className}`}>
    {children}
  </p>
);

export default Section;