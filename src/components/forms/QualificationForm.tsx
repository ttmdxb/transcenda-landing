import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, CheckCircle, Clock, Shield, Star, ArrowRight } from 'lucide-react';

interface QualificationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Stage 1
  companyName: string;
  role: string;
  industry: string;
  
  // Stage 2
  monthlyRevenue: string;
  primaryChallenge: string;
  timeline: string;
  
  // Stage 3
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredTime: string;
}

const QualificationForm: React.FC<QualificationFormProps> = ({ isOpen, onClose }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    role: '',
    industry: '',
    monthlyRevenue: '',
    primaryChallenge: '',
    timeline: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStage = () => {
    if (currentStage < 3) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          industry: formData.industry,
          monthlyRevenue: formData.monthlyRevenue,
          primaryChallenge: formData.primaryChallenge,
          timeline: formData.timeline,
          role: formData.role,
          source: 'Landing Page Qualification Form',
          preferredTime: formData.preferredTime
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const canProceedStage1 = formData.companyName && formData.role && formData.industry;
  const canProceedStage2 = formData.monthlyRevenue && formData.primaryChallenge && formData.timeline;
  const canSubmit = formData.firstName && formData.phone && formData.email;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Let's See If You Qualify for Our Growth Guarantee
          </h2>
          <p className="text-blue-100">
            We only work with 5 new clients per month to ensure exceptional results
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((stage) => (
              <div key={stage} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stage <= currentStage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {stage < currentStage ? <CheckCircle className="w-5 h-5" /> : stage}
                </div>
                {stage < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      stage < currentStage ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-400 text-sm">
            Step {currentStage} of 3
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {currentStage === 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Company Intelligence</h3>
                  <p className="text-gray-400">First, let's understand your business...</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 bg-gray-800 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your challenge</option>
                    <option value="Lead response time killing conversions">Lead response time killing conversions</option>
                    <option value="Can't scale without hiring more staff">Can't scale without hiring more staff</option>
                    <option value="Losing leads to competitors">Losing leads to competitors</option>
                    <option value="Low appointment show rates">Low appointment show rates</option>
                    <option value="Manual tasks eating profits">Manual tasks eating profits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Implementation Timeline *
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => updateFormData('timeline', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediately (losing money daily)">Immediately (losing money daily)</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="Within 90 days">Within 90 days</option>
                    <option value="Just researching">Just researching</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevStage}
                    className="flex-1 bg-gray-700 text-white font-semibold py-4 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={nextStage}
                    disabled={!canProceedStage2}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Final Step <ArrowRight className="inline ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStage === 3 && !submitted && (
              <motion.div
                key="stage3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-lg mb-4">
                    <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white mb-2">Perfect! You Qualify</h3>
                    <p className="text-green-100">Let's schedule your strategy session...</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Smith"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Best Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+971 XX XXX XXXX"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Meeting Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => updateFormData('preferredTime', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose your preferred slot</option>
                    <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                    <option value="Afternoon (12PM - 5PM)">Afternoon (12PM - 5PM)</option>
                    <option value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                {/* Guarantee Box */}
                <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border border-green-600 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">100% Free Strategy Session</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">$5,000 Value Automation Audit Included</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">No Obligation to Proceed</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevStage}
                    className="flex-1 bg-gray-700 text-white font-semibold py-4 rounded-lg hover:bg-gray-600 transition-all"
                    disabled={isSubmitting}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Securing Your Spot...
                      </div>
                    ) : (
                      <>
                        Lock In My Growth Session <Calendar className="inline ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-lg mb-6">
                  <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Success! Your Growth Session is Secured
                  </h3>
                  <p className="text-green-100 text-lg">
                    We'll contact you within 15 minutes to confirm your appointment
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-bold text-white mb-4">What Happens Next:</h4>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-gray-300">Our growth specialist calls you within 15 minutes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-gray-300">We conduct your FREE $5,000 automation audit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-gray-300">Present your custom growth strategy in 30 minutes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                      <span className="text-gray-300">Identify at least 100K AED in hidden revenue (guaranteed)</span>
                    </div>
                  </div>
                </div>

                <div className="text-gray-400 text-sm">
                  <p>Can't wait? Call us directly: <span className="text-blue-400 font-semibold">+971 XX XXX XXXX</span></p>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Close Button */}
        {!submitted && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QualificationForm; border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => updateFormData('role', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your role</option>
                    <option value="CEO/Founder">CEO/Founder</option>
                    <option value="Sales Director">Sales Director</option>
                    <option value="Marketing Director">Marketing Director</option>
                    <option value="Operations Director">Operations Director</option>
                    <option value="Other Decision Maker">Other Decision Maker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your industry</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Technology/SaaS">Technology/SaaS</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Other High-Ticket">Other High-Ticket</option>
                  </select>
                </div>

                <button
                  onClick={nextStage}
                  disabled={!canProceedStage1}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Growth Potential <ArrowRight className="inline ml-2 w-5 h-5" />
                </button>
              </motion.div>
            )}

            {currentStage === 2 && (
              <motion.div
                key="stage2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Growth Opportunity Analysis</h3>
                  <p className="text-gray-400">Now, let's identify your growth opportunity...</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Monthly Revenue (AED) *
                  </label>
                  <select
                    value={formData.monthlyRevenue}
                    onChange={(e) => updateFormData('monthlyRevenue', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select revenue range</option>
                    <option value="Under 100K">Under 100K</option>
                    <option value="100K - 500K">100K - 500K</option>
                    <option value="500K - 1M">500K - 1M</option>
                    <option value="1M - 5M">1M - 5M</option>
                    <option value="Above 5M">Above 5M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Growth Challenge *
                  </label>
                  <select
                    value={formData.primaryChallenge}
                    onChange={(e) => updateFormData('primaryChallenge', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border
