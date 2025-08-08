import React, { useState } from 'react';
import { Send, FileText, Building, User } from 'lucide-react';
import { Modal, Card, Button } from './ui';

interface ResumeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  jobLink: string;
  additionalInfo: string;
}

const ResumeRequestModal: React.FC<ResumeRequestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    companyName: '',
    applicantName: '',
    applicantEmail: '',
    jobLink: '',
    additionalInfo: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Resume Request: ${formData.jobTitle} at ${formData.companyName}`);
    
    const body = encodeURIComponent(`Hi Vince,

I would like to request a tailored resume for the following opportunity:

JOB DETAILS:
• Position: ${formData.jobTitle}
• Company: ${formData.companyName}
• Job Link: ${formData.jobLink || 'Not provided'}

MY CONTACT INFORMATION:
• Name: ${formData.applicantName}
• Email: ${formData.applicantEmail}

${formData.additionalInfo ? `ADDITIONAL INFORMATION:
${formData.additionalInfo}` : ''}

Please let me know if you need any additional information. I look forward to hearing from you!

Best regards,
${formData.applicantName}`);

    const mailtoUrl = `mailto:vincevasile@vinny-van-gogh.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  const isFormValid = formData.jobTitle && formData.companyName && formData.applicantName && formData.applicantEmail;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Tailored Resume"
      size="lg"
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-champagne" />
          <p className="text-metallic-silver/90 leading-relaxed">
            I'll create a customized resume specifically tailored to your opportunity. Please provide the details below.
          </p>
        </div>
        <div className="text-sm text-platinum/60 bg-onyx-metallic/30 rounded-lg p-3 border border-metallic-silver/10">
          💡 <strong>Pro tip:</strong> The more details you provide, the better I can tailor the resume to match the role!
        </div>
      </div>

      <div className="space-y-6">
        {/* Job Information */}
        <Card variant="glass" className="p-4">
          <h3 className="text-champagne font-semibold mb-4 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Job Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-metallic-silver mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="e.g. Senior AI Engineer"
                className="w-full px-3 py-2 bg-onyx-metallic/50 border border-metallic-silver/20 rounded-lg text-metallic-silver placeholder-metallic-silver/50 focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-metallic-silver mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="e.g. OpenAI"
                className="w-full px-3 py-2 bg-onyx-metallic/50 border border-metallic-silver/20 rounded-lg text-metallic-silver placeholder-metallic-silver/50 focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-metallic-silver mb-2">
              Job Posting Link (Optional)
            </label>
            <input
              type="url"
              value={formData.jobLink}
              onChange={(e) => handleInputChange('jobLink', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-onyx-metallic/50 border border-metallic-silver/20 rounded-lg text-metallic-silver placeholder-metallic-silver/50 focus:outline-none focus:border-champagne/50 transition-colors"
            />
          </div>
        </Card>

        {/* Your Information */}
        <Card variant="glass" className="p-4">
          <h3 className="text-champagne font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            Your Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-metallic-silver mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => handleInputChange('applicantName', e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full px-3 py-2 bg-onyx-metallic/50 border border-metallic-silver/20 rounded-lg text-metallic-silver placeholder-metallic-silver/50 focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-metallic-silver mb-2">
                Your Email *
              </label>
              <input
                type="email"
                value={formData.applicantEmail}
                onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full px-3 py-2 bg-onyx-metallic/50 border border-metallic-silver/20 rounded-lg text-metallic-silver placeholder-metallic-silver/50 focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <Card variant="glass" className="p-4">
          <h3 className="text-champagne font-semibold mb-4">
            Additional Information (Optional)
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-metallic-silver mb-2">
              Specific requirements, key skills to highlight, or other details
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="e.g. Focus on ML/AI experience, mention specific frameworks, highlight leadership experience, etc."
              rows={4}
              className="w-full px-3 py-2 bg-onyx-metallic/50 border border-metallic-silver/20 rounded-lg text-metallic-silver placeholder-metallic-silver/50 focus:outline-none focus:border-champagne/50 transition-colors resize-vertical"
            />
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t border-metallic-silver/10">
        <Button
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          icon={Send}
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Send Request
        </Button>
      </div>

      {!isFormValid && (
        <p className="text-sm text-metallic-silver/60 text-center mt-2">
          Please fill in all required fields (marked with *)
        </p>
      )}
    </Modal>
  );
};

export default ResumeRequestModal;