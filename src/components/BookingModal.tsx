import React, { useState, useEffect } from 'react';
import { Clock, MessageCircle, Search, Code2, Briefcase, Brain, Building2, ArrowLeft } from 'lucide-react';
import { Modal, Card, Button } from './ui';
import bookingData from '../data/booking-options.json';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFreePlan?: boolean;
  generalConsultation?: any;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, isFreePlan = false, generalConsultation }) => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  
  // Filter out options without Calendly URLs
  const availableOptions = bookingData.bookingOptions.filter(option => option.calendlyUrl);

  // On free plan, auto-select general consultation when modal opens
  useEffect(() => {
    if (isOpen && isFreePlan && generalConsultation && !selectedOption) {
      setSelectedOption(generalConsultation);
    }
  }, [isOpen, isFreePlan, generalConsultation, selectedOption]);

  // Load Calendly widget script
  useEffect(() => {
    if (selectedOption && !isCalendlyLoaded) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setIsCalendlyLoaded(true);
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [selectedOption, isCalendlyLoaded]);

  // Initialize Calendly widget when script is loaded
  useEffect(() => {
    if (selectedOption && isCalendlyLoaded && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: selectedOption.calendlyUrl,
        parentElement: document.getElementById('calendly-inline-widget'),
        prefill: {},
        utm: {}
      });
    }
  }, [selectedOption, isCalendlyLoaded]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
    }
  }, [isOpen]);

  const handleBack = () => {
    setSelectedOption(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle': return <MessageCircle className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      default: return <MessageCircle className="w-5 h-5" />;
    }
  };

  // If no option selected AND not on free plan, show selection screen
  if (!selectedOption && !isFreePlan) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Schedule a Consultation"
        size="lg"
      >
        <div className="mb-6">
          <p className="text-metallic-silver/90 leading-relaxed">
            Choose the type of consultation that best fits your needs. Each session is designed to provide maximum value and actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
          {availableOptions.map((option) => (
            <Card 
              key={option.id} 
              variant="glass" 
              className="group hover:border-champagne/30 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedOption(option)}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-champagne/20 to-platinum/20 group-hover:from-champagne/30 group-hover:to-platinum/30 transition-all">
                  {getIcon(option.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-champagne group-hover:text-champagne/90 transition-colors">
                    {option.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-metallic-silver/70 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{option.duration}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-metallic-silver/80 leading-relaxed mb-4">
                {option.description}
              </p>

              {/* Action indicator */}
              <div className="text-xs text-platinum/60 group-hover:text-platinum/80 transition-colors">
                Click to continue →
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-metallic-silver/10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="text"
              onClick={() => {
                window.location.href = 'mailto:vincevasile@vinny-van-gogh.com?subject=Custom Booking Request';
                onClose();
              }}
            >
              Need something else? Email me
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  // If on free plan and no option selected yet, show loading
  if (isFreePlan && !selectedOption) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Schedule a Consultation"
        size="xl"
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-champagne border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-metallic-silver/80">Loading booking calendar...</p>
          </div>
        </div>
      </Modal>
    );
  }

  // Show Calendly booking widget
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedOption.title}
      size="xl"
    >
      {/* Header with back button (only show on paid plan) */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-metallic-silver/10">
        {!isFreePlan && (
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-metallic-silver/80">
            <Clock className="w-4 h-4" />
            <span>{selectedOption.duration}</span>
          </div>
        </div>
      </div>

      {/* Calendly Widget Container */}
      <div 
        id="calendly-inline-widget" 
        className="min-h-[600px] w-full"
      >
        {!isCalendlyLoaded && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-champagne border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-metallic-silver/80">Loading booking calendar...</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BookingModal;