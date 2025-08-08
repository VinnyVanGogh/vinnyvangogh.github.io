import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Github, ExternalLink, Send, Calendar } from 'lucide-react';
import { Section, SectionTitle, Card, Button } from '../components/ui';
import BookingModal from '../components/BookingModal';
import profileData from '../data/profile.json';
import bookingData from '../data/booking-options.json';

const Contact: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Check if we're on free plan and handle booking logic
  const isFreePlan = bookingData.calendlyPlan === 'free';
  const generalConsultation = bookingData.bookingOptions.find(option => option.id === 'general-consultation');

  const handleScheduleClick = () => {
    setIsBookingModalOpen(true);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: profileData.email,
      action: `mailto:${profileData.email}`,
      primary: true
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      action: profileData.linkedin,
      primary: false
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'View My Code',
      action: profileData.github,
      primary: false
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: profileData.location,
      action: null,
      primary: false
    }
  ];

  return (
    <Section className="pt-24 pb-16">
      <SectionTitle>Let's Connect</SectionTitle>
      
      <div className="max-w-4xl mx-auto mt-12">
        {/* Intro Message */}
        <Card variant="glass" className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-champagne mb-4">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-metallic-silver/90 leading-relaxed max-w-2xl mx-auto">
            Whether you're looking for AI solutions, enterprise automation, or technical leadership, 
            I'm here to help transform your ideas into production-ready systems.
          </p>
        </Card>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method) => (
            <Card 
              key={method.label}
              variant="elevated"
              className="group hover:border-champagne/30 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-champagne/20 to-platinum/20 group-hover:from-champagne/30 group-hover:to-platinum/30 transition-all">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-platinum/80 uppercase tracking-wider mb-1">
                    {method.label}
                  </h4>
                  {method.action ? (
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-metallic-silver hover:text-champagne transition-colors inline-flex items-center gap-2"
                    >
                      <span>{method.value}</span>
                      {method.action.startsWith('http') && (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </a>
                  ) : (
                    <p className="text-metallic-silver">{method.value}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={Send}
              onClick={() => window.location.href = `mailto:${profileData.email}`}
            >
              Send Me an Email
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Calendar}
              iconPosition="right"
              onClick={handleScheduleClick}
            >
              Schedule a Call
            </Button>
          </div>
          
          <p className="text-sm text-metallic-silver/70">
            Available for freelance projects, consulting, and full-time opportunities
          </p>
        </div>

        {/* Response Time */}
        <Card variant="glass" className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-champagne rounded-full animate-pulse" />
            <span className="text-sm font-medium text-platinum uppercase tracking-wider">
              Currently Available
            </span>
          </div>
          <p className="text-sm text-metallic-silver/80">
            Typical response time: Within 24 hours
          </p>
        </Card>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        isFreePlan={isFreePlan}
        generalConsultation={generalConsultation}
      />
    </Section>
  );
};

export default Contact;