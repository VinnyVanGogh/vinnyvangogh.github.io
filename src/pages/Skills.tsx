import React, { useState } from 'react';
import { Code2, Brain, Server, Cloud, Shield, Terminal, Star, Award, ChevronRight } from 'lucide-react';
import { Section, SectionTitle, Card, Badge } from '../components/ui';
import skillsData from '../data/skills.json';

const Skills: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('ai-ml');

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'ai-ml': return <Brain className="w-5 h-5" />;
      case 'backend': return <Server className="w-5 h-5" />;
      case 'frontend': return <Code2 className="w-5 h-5" />;
      case 'devops': return <Cloud className="w-5 h-5" />;
      case 'automation': return <Terminal className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch(level) {
      case 'expert': return 'text-champagne border-champagne/30 bg-champagne/10';
      case 'advanced': return 'text-platinum border-platinum/30 bg-platinum/10';
      case 'intermediate': return 'text-metallic-silver border-metallic-silver/30 bg-metallic-silver/10';
      default: return 'text-metallic-silver border-metallic-silver/30';
    }
  };

  const getSkillLevelStars = (level: string) => {
    switch(level) {
      case 'expert': return 5;
      case 'advanced': return 4;
      case 'intermediate': return 3;
      default: return 2;
    }
  };

  return (
    <Section className="pt-24 pb-16">
      <SectionTitle>Technical Expertise</SectionTitle>

      {/* Skills Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {skillsData.categories.map((category) => (
          <Card 
            key={category.id}
            variant="elevated"
            className={`cursor-pointer transition-all duration-500 ${
              expandedCategory === category.id 
                ? 'ring-2 ring-champagne/30 shadow-[0_0_30px_rgba(247,231,206,0.1)]' 
                : 'hover:border-platinum/30'
            }`}
            onClick={() => setExpandedCategory(
              expandedCategory === category.id ? null : category.id
            )}
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-champagne/20 to-platinum/20">
                  {getCategoryIcon(category.id)}
                </div>
                <h3 className="text-lg font-bold text-champagne">
                  {category.name}
                </h3>
              </div>
              <ChevronRight className={`w-5 h-5 text-platinum transition-transform duration-300 ${
                expandedCategory === category.id ? 'rotate-90' : ''
              }`} />
            </div>

            {/* Skills List */}
            <div className={`space-y-3 overflow-hidden transition-all duration-500 ${
              expandedCategory === category.id ? 'max-h-[600px] opacity-100' : 'max-h-32 opacity-80'
            }`}>
              {category.skills.map((skill) => (
                <div key={skill.name} className="border-l-2 border-metallic-silver/20 pl-4 py-2">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-metallic-silver">
                          {skill.name}
                        </h4>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${
                                i < getSkillLevelStars(skill.level)
                                  ? 'fill-champagne text-champagne'
                                  : 'text-metallic-silver/30'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-metallic-silver/70">
                        <span className={`px-2 py-0.5 rounded-full border ${getSkillLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span>•</span>
                        <span>{skill.years} years</span>
                      </div>
                    </div>
                  </div>
                  {skill.details && expandedCategory === category.id && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {skill.details.map((detail) => (
                        <Badge key={detail} variant="skill" className="text-xs">
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Programming Languages */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-platinum mb-6 flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          Programming Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillsData.languages.map((lang) => (
            <Badge key={lang} variant="highlight" className="px-4 py-2">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-platinum mb-6 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Certifications & Learning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsData.certifications.map((cert) => (
            <Card key={cert.name} variant="glass" className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-metallic-silver">{cert.name}</h4>
                <p className="text-sm text-metallic-silver/70">Target: {cert.target}</p>
              </div>
              <Badge variant={cert.status === 'In Progress' ? 'metric' : 'status'}>
                {cert.status}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;