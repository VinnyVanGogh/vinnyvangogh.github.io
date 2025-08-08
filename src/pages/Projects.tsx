import React, { useState } from 'react';
import { Code2, Users, TrendingUp, Filter } from 'lucide-react';
import { Section, SectionTitle, Card, Badge } from '../components/ui';
import projectsData from '../data/projects.json';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(projectsData.projects.map(p => p.category))];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projectsData.projects 
    : projectsData.projects.filter(p => p.category === selectedCategory);

  const getMetricIcon = (key: string) => {
    switch(key) {
      case 'linesOfCode':
      case 'files':
        return <Code2 className="w-4 h-4" />;
      case 'users':
      case 'tenants':
        return <Users className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <Section className="pt-24 pb-16">
      <SectionTitle>Featured Projects</SectionTitle>
      
      {/* Category Filter */}
      <div className="mt-8 mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-platinum" />
          <span className="text-sm font-medium text-platinum uppercase tracking-wider">Filter by Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-champagne text-onyx-pure border-champagne font-medium'
                  : 'border-metallic-silver/30 text-metallic-silver hover:border-platinum hover:text-platinum'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id} 
            variant="elevated" 
            className="group hover:border-champagne/30 transition-all duration-500"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-champagne group-hover:text-champagne/90 transition-colors">
                  {project.title}
                </h3>
                <Badge variant="metric" className="text-xs">
                  {project.status}
                </Badge>
              </div>
              <p className="text-metallic-silver/90 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-metallic-silver/10">
                {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {getMetricIcon(key)}
                      <span className="text-lg font-bold text-platinum">{value}</span>
                    </div>
                    <span className="text-xs text-metallic-silver/70 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-platinum/80 mb-3 uppercase tracking-wider">
                Key Features
              </h4>
              <ul className="space-y-1.5">
                {project.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="text-sm text-metallic-silver/80 flex items-start gap-2">
                    <span className="text-champagne/60 mt-1">•</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 6).map((tech) => (
                <Badge key={tech} variant="skill" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 6 && (
                <Badge variant="status" className="text-xs">
                  +{project.technologies.length - 6} more
                </Badge>
              )}
            </div>

          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Projects;