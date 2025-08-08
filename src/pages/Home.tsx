import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Server, Brain, FileText } from 'lucide-react';
import { Button, Section } from '../components/ui';
import ResumeRequestModal from '../components/ResumeRequestModal';

const Home: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const metrics = [
    { label: 'Years Experience', value: '9+', description: '2016 - Present' },
    { label: 'Lines of Code', value: '322K+', description: 'Production Ready' },
    { label: 'System Uptime', value: '99.95%', description: 'Enterprise Grade' },
    { label: 'AI Sessions', value: '261+', description: 'Multi-LLM Expertise' }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Vince Vasile</span>
              <br />
              <span className="text-gradient">Applied AI Engineer</span>
            </h1>
            <p className="text-xl md:text-2xl text-metallic-silver/80 max-w-3xl">
              Building production-grade AI systems with almost a decade of engineering expertise. 
              Specializing in multi-LLM coordination, enterprise automation, and scalable architectures.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/projects">
              <Button variant="primary" icon={ArrowRight} iconPosition="right">
                View My Work
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">
                Get In Touch
              </Button>
            </Link>
            <Button 
              variant="text" 
              icon={FileText}
              onClick={() => setIsResumeModalOpen(true)}
            >
              Request Resume
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="card-glass p-4">
                <div className="text-3xl md:text-4xl font-bold text-champagne">
                  {metric.value}
                </div>
                <div className="text-sm text-metallic-silver">
                  {metric.label}
                </div>
                <div className="text-xs text-metallic-silver/60 mt-1">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Quick Highlights */}
      <Section className="pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-default">
            <div className="flex items-center mb-4">
              <Brain className="text-platinum mr-3" size={32} />
              <h3 className="text-xl font-bold text-white">AI Expertise</h3>
            </div>
            <p className="text-metallic-silver/80">
              Multi-LLM coordination with Claude, OpenAI, and Ollama. 
              Production MCP architectures and RAG systems processing 10,000+ documents.
            </p>
          </div>

          <div className="card-default">
            <div className="flex items-center mb-4">
              <Code className="text-champagne mr-3" size={32} />
              <h3 className="text-xl font-bold text-white">Full-Stack Development</h3>
            </div>
            <p className="text-metallic-silver/80">
              React, TypeScript, Python, and Go expertise. 
              Building scalable applications from mobile apps to enterprise SaaS platforms.
            </p>
          </div>

          <div className="card-default">
            <div className="flex items-center mb-4">
              <Server className="text-platinum mr-3" size={32} />
              <h3 className="text-xl font-bold text-white">Enterprise Scale</h3>
            </div>
            <p className="text-metallic-silver/80">
              Managing systems with $50K+ monthly revenue. 
              HIPAA-compliant architectures and 99.95% uptime achievements.
            </p>
          </div>
        </div>
      </Section>

      {/* Resume Request Modal */}
      <ResumeRequestModal 
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
};

export default Home;