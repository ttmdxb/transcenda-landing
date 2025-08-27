import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Phone, Zap, Target, Shield, TrendingUp, Clock, Award, CheckCircle, ArrowRight, Play, Star, Users, DollarSign } from 'lucide-react';

// Particle Animation Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Neural Network Animation
const NeuralNetwork = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r="2"
            fill="#60a5fa"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 100 + "%"}
            y1={Math.random() * 100 + "%"}
            x2={Math.random() * 100 + "%"}
            y2={Math.random() * 100 + "%"}
            stroke="#60a5fa"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// ROI Calculator Component
const ROICalculator = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    monthlyLeads: '',
    avgDealValue: '',
    closeRate: '',
    responseTime: ''
  });
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    const leads = parseInt(formData.monthlyLeads) || 0;
    const dealValue = parseInt(formData.avgDealValue) || 0;
    const currentClose = parseInt(formData.closeRate) || 0;
    const responseTime = parseInt(formData.responseTime) || 0;
    
    // Calculation logic based on your document
    const currentRevenue = leads * dealValue * (currentClose / 100);
    const improvedClose = Math.min(currentClose * 2.2, 45); // Max 45% close rate
    const potentialRevenue = leads * dealValue * (improvedClose / 100);
    const monthlyIncrease = potentialRevenue - currentRevenue;
    const annualIncrease = monthlyIncrease * 12;
    const currentlyLosing = leads * dealValue * 0.3 * (responseTime / 24); // Loss factor
    
    setResults({
      monthlyIncrease: Math.round(monthlyIncrease),
      annualIncrease: Math.round(annualIncrease),
      currentlyLosing: Math.round(currentlyLosing),
      breakeven: Math.ceil((5000 * 12) / monthlyIncrease * 30) // Days to breakeven
    });
  };

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
        className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Transcenda Revenue Growth Calculator
          </h3>
          <p className="text-gray-300">
            Our AI analyzes your metrics against 500+ successful implementations
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Monthly Leads
            </label>
            <input
              type="number"
              value={formData.monthlyLeads}
              onChange={(e) => setFormData({...formData, monthlyLeads: e.target.value})}
              placeholder="e.g., 250"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Average Deal Value (AED)
            </label>
            <input
              type="number"
              value={formData.avgDealValue}
              onChange={(e) => setFormData({...formData, avgDealValue: e.target.value})}
              placeholder="e.g., 50,000"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Close Rate (%)
            </label>
            <input
              type="number"
              value={formData.closeRate}
              onChange={(e) => setFormData({...formData, closeRate: e.target.value})}
              placeholder="e.g., 15"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Average Response Time (Hours)
            </label>
            <input
              type="number"
              value={formData.responseTime}
              onChange={(e) => setFormData({...formData, responseTime: e.target.value})}
              placeholder="e.g., 24"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={calculateROI}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mb-6"
        >
          Calculate My Revenue Potential
        </button>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 border border-green-600 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                +{results.monthlyIncrease.toLocaleString()} AED
              </div>
              <div className="text-sm text-gray-300">Monthly Revenue Potential</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border border-blue-600 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                +{results.annualIncrease.toLocaleString()} AED
              </div>
              <div className="text-sm text-gray-300">12-Month Growth Forecast</div>
            </div>
            <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 border border-red-600 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400">
                -{results.currentlyLosing.toLocaleString()} AED
              </div>
              <div className="text-sm text-gray-300">Currently Losing/month</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-600 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {results.breakeven} days
              </div>
              <div className="text-sm text-gray-300">Breakeven Point</div>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Claim This Growth → Book Strategy Session
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// AI Chat Widget
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi, I'm ARIA, your business growth analyst. I've helped 300+ businesses in the GCC identify hidden revenue. What's your biggest growth challenge right now?"
    }
  ]);

  const quickReplies = [
    "I'm losing leads to slow response times",
    "My team can't handle lead volume", 
    "Our close rate is below 20%",
    "I need to scale but costs are too high"
  ];

  return (
    <>
      {/* Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Phone className="w-6 h-6 text-white" />
        </button>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg p-3 max-w-xs"
          >
            <p className="text-white text-sm">
              Hi! I'm ARIA. Ready to unlock your hidden revenue?
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 w-96 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-40"
        >
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">ARIA - Growth Analyst</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-4 h-60 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-xs ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            <div className="space-y-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="block w-full text-left p-2 text-sm text-blue-400 hover:bg-gray-800 rounded"
                  onClick={() => {
                    setMessages([...messages, { type: 'user', text: reply }]);
                    // Add bot response logic here
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

// Main Landing Page Component
const TranscendaLanding = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      company: "Skyline Properties Dubai",
      executive: "Ahmed Al-Rashid, CEO",
      quote: "Transcenda's AI voice agent booked 73 property viewings in our first week. Our human agents couldn't believe it. We've now deployed it across all our developments. ROI hit 400% by month three.",
      metric: "400% ROI in 90 Days",
      industry: "Luxury Real Estate"
    },
    {
      company: "Gulf Business Consultancy", 
      executive: "Sarah Mitchell, Managing Partner",
      quote: "We were losing 60% of leads to slow follow-up. Transcenda's system responds in under 60 seconds. Our close rate jumped from 12% to 34%. This technology is mandatory for high-ticket sales.",
      metric: "183% Close Rate Increase",
      industry: "Business Consulting"
    },
    {
      company: "MENA Tech Solutions",
      executive: "Khalid Bin Sulaiman, Founder", 
      quote: "The ROI calculator showed us leaving 2.3M AED on the table annually. Transcenda recovered 70% of that in 6 months. Their automation runs our entire sales operation now.",
      metric: "1.6M AED Recovered Revenue",
      industry: "Enterprise Technology"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <NeuralNetwork />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Watch Your Business Revenue Jump 47% in 90 Days
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Dubai's Elite Businesses Trust Transcenda to Deploy Military-Grade CRM Systems, 
              Voice AI Agents & Conversion Machines That Work While You Sleep
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => setShowCalculator(true)}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Calculate Your Revenue Potential
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-8 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>327 Businesses Automated This Quarter</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span>$50M+ Client Revenue Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span>Operating in: Dubai | Abu Dhabi | Riyadh | Kuwait</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Weapons Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Your Competitors Are Already Using These Weapons</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every day you wait, they're capturing YOUR leads with these systems
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="w-12 h-12 text-blue-400" />,
                title: "24/7 AI Voice Legion",
                points: [
                  "Answers in 3 seconds, any language",
                  "Books appointments while you sleep", 
                  "Handles 1,000 calls simultaneously",
                  "Never sick, never tired, never rude"
                ],
                proof: "457% increase in qualified appointments",
                cta: "Hear It In Action"
              },
              {
                icon: <Zap className="w-12 h-12 text-purple-400" />,
                title: "Revenue Acceleration Engine", 
                points: [
                  "Sub-60 second lead response",
                  "9-touch follow-up sequences",
                  "Intelligent lead scoring", 
                  "Automated pipeline movement"
                ],
                proof: "87% of dead leads reactivated",
                cta: "See Dashboard Demo"
              },
              {
                icon: <Target className="w-12 h-12 text-green-400" />,
                title: "Multi-Channel Domination",
                points: [
                  "WhatsApp, SMS, Email synced",
                  "Social retargeting automation",
                  "Appointment reminders that work",
                  "Review generation on autopilot"
                ],
                proof: "3.4x improvement in show rates", 
                cta: "View Workflow"
              }
            ].map((weapon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all hover:transform hover:scale-105"
              >
                <div className="mb-6">{weapon.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{weapon.title}</h3>
                <ul className="space-y-2 mb-6">
                  {weapon.points.map((point, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="text-center mb-4 p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">{weapon.proof}</div>
                </div>
                <button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all group-hover:from-blue-600 group-hover:to-purple-600">
                  {weapon.cta} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Market Leaders Choose Transcenda</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join 300+ businesses that no longer worry about lead generation
            </p>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {testimonials[currentTestimonial].metric}
                </div>
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  {testimonials[currentTestimonial].industry}
                </div>
              </div>
              
              <blockquote className="text-xl text-gray-300 mb-6 italic leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {testimonials[currentTestimonial].executive}
                  </div>
                  <div className="text-blue-400">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-8 mt-16"
          >
            {['Google Cloud Partner', 'Meta Business Partner', 'HubSpot Certified', 'ISO 27001 Compliant'].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Only 5 new clients accepted monthly</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span>2 spots already claimed this week</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-red-400">
                <TrendingUp className="w-5 h-5" />
                <span>Next availability: 6 weeks out</span>
              </div>
            </div>

            {/* Risk Reversal */}
            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-600 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Our 100K Revenue Guarantee</h3>
              <p className="text-gray-300 text-lg">
                If we don't identify at least 100,000 AED in recoverable revenue during your strategy session, 
                we'll pay you 1,000 AED for your time.
              </p>
            </div>

            <button className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-12 py-4 rounded-lg font-bold text-xl hover:from-red-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Secure Your Spot Now →
            </button>
            
            <p className="text-gray-400">
              ⚡️ Average client sees ROI in 21 days or less
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">One Decision Away From Exponential Growth</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>15-Minute Implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                <span>24/7 Support Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Zero Downtime Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Enterprise-Grade Security</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Voice Agents</li>
                <li>CRM Automation</li>
                <li>Sales Acceleration</li>
                <li>Lead Recovery Systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setShowCalculator(true)}>ROI Calculator</button></li>
                <li>Case Studies</li>
                <li>Growth Audit</li>
                <li>Implementation Guide</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Transcenda</li>
                <li>Success Stories</li>
                <li>Partner Program</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>WhatsApp: +971 XX XXX XXXX</li>
                <li>Email: growth@transcenda.ae</li>
                <li>Office: Dubai Digital Park</li>
                <li>Book Direct Meeting</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Transcenda | Transforming GCC Businesses Through Intelligence | Privacy | Terms</p>
          </div>
        </div>
      </footer>

      {/* ROI Calculator Modal */}
      <ROICalculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />

      {/* AI Chat Widget */}
      <AIChat />
    </div>
  );
};

export default TranscendaLanding;{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-gradient-to-br from-red-900/20 to-purple-900/20 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-8">
              Limited Deployment Capacity: 3 Spots Remaining This Month
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>
