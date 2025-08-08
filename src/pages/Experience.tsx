import React from 'react';
import { Calendar, MapPin, TrendingUp, ChevronRight } from 'lucide-react';
import { Section, SectionTitle, Card, Badge } from '../components/ui';
import experienceData from '../data/experience.json';

const Experience: React.FC = () => {
  return (
    <Section className="pt-24 pb-16">
      <SectionTitle>Professional Experience</SectionTitle>
      
      <div className="relative mt-12">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-champagne via-platinum to-transparent" />
        
        {/* Experience items */}
        <div className="space-y-12">
          {experienceData.experiences.map((exp) => (
            <div key={exp.id} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="absolute left-8 w-4 h-4 -translate-x-1/2">
                <div className={`w-4 h-4 rounded-full ${
                  exp.current 
                    ? 'bg-champagne animate-pulse shadow-[0_0_20px_rgba(247,231,206,0.5)]' 
                    : 'bg-platinum'
                }`} />
              </div>
              
              {/* Content */}
              <div className="ml-20 flex-1">
                <Card variant="elevated" className="group hover:border-champagne/20 transition-all duration-500">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-champagne mb-1">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg text-platinum font-medium mb-2">
                        {exp.company}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-metallic-silver/80">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    {exp.current && (
                      <Badge variant="highlight" className="mt-2 sm:mt-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  {/* Highlights */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-platinum/80 mb-3 uppercase tracking-wider">
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2 text-metallic-silver/90">
                          <ChevronRight className="w-4 h-4 text-champagne/60 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="skill">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline end marker */}
        <div className="absolute left-8 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-transparent to-onyx-pure" />
      </div>
    </Section>
  );
};

export default Experience;