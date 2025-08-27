'use client'

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Phone, Mail, MapPin, Star, Play, Check, X, 
  Calendar, Calculator, Zap, Shield, Clock, Users, TrendingUp, 
  Award, MessageCircle, ArrowRight, CheckCircle, AlertCircle, Target 
} from 'lucide-react';

export default function TranscendaLanding() {
  const [chatOpen, setChatOpen] = useState(false);
  const [calculatorResults, setCalculatorResults] = useState<any>(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    leads: '',
    dealValue: '',
    closeRate: '',
    responseTime: ''
  });

  const calculateROI = () => {
    const leads = parseInt(calculatorInputs.leads) || 0;
    const dealValue = parseInt(calculatorInputs.dealValue) || 0;
    const closeRate = parseInt(calculatorInputs.closeRate) || 0;

    const currentRevenue = leads * dealValue * (closeRate / 100);
    const improvedRevenue = leads * dealValue * 0.35; // 35% close rate
    const monthlyGain = improvedRevenue - currentRevenue;
    
    setCalculatorResults({
      monthlyGain: Math.round(monthlyGain),
      annualGain: Math.round(monthlyGain * 12),
      lostRevenue: Math.round(currentRevenue * 0.3),
      roiDays: 30
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 flex flex-wrap justify-center items-center gap-6 text-sm text-blue-300">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              327 Businesses Automated This Quarter
            </span>
            <span>Operating in: Dubai | Abu Dhabi | Riyadh | Kuwait</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
            Watch Your Business Revenue Jump 
            <span className="text-cyan-400"> 47%</span> in 90 Days
          </h1>
          
          <h2 className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Dubai's Elite Businesses Trust Transcenda to Deploy Military-Grade CRM Systems, 
            Voice AI Agents & Conversion Machines That Work While You Sleep
          </h2>

          <button 
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <Calculator className="w-6 h-6" />
            Calculate Your Revenue Potential
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See Your Profit Potential in Real-Time</h2>
            <p className="text-xl text-gray-300">Our AI analyzes your business metrics against 500+ successful implementations</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Monthly Leads</label>
                  <input
                    type="number"
                    placeholder="e.g., 250"
                    value={calculatorInputs.leads}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, leads: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Average Deal Value (AED)</label>
                  <input
                    type="number"
                    placeholder="e.g., 50,000"
                    value={calculatorInputs.dealValue}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, dealValue: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Close Rate (%)</label>
                  <input
                    type="number"
                    placeholder="e.g., 15"
                    value={calculatorInputs.closeRate}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, closeRate: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={calculateROI}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Calculate My Potential
                </button>
              </div>

              <div className="space-y-4">
                {calculatorResults ? (
                  <>
                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-6">
                      <h4 className="font-bold text-green-400 mb-2">Monthly Revenue Potential</h4>
                      <p className="text-2xl font-bold">+{calculatorResults.monthlyGain.toLocaleString()} AED</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-6">
                      <h4 className="font-bold text-blue-400 mb-2">Annual Growth Forecast</h4>
                      <p className="text-2xl font-bold">+{calculatorResults.annualGain.toLocaleString()} AED</p>
                    </div>
                    <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-bold text-lg">
                      Book Strategy Session
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your business metrics to see your growth potential</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Competitors Are Already Using These Weapons</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">24/7 AI Voice Legion</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>✓ Answers in 3 seconds, any language</li>
                <li>✓ Books appointments while you sleep</li>
                <li>✓ Handles 1,000 calls simultaneously</li>
              </ul>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-bold">457% increase in qualified appointments</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Revenue Acceleration Engine</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>✓ Sub-60 second lead response</li>
                <li>✓ 9-touch follow-up sequences</li>
                <li>✓ Intelligent lead scoring</li>
              </ul>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-bold">87% of dead leads reactivated</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Multi-Channel Domination</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>✓ WhatsApp, SMS, Email synced</li>
                <li>✓ Social retargeting automation</li>
                <li>✓ Review generation on autopilot</li>
              </ul>
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-bold">3.4x improvement in show rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to 10x Your Revenue?</h2>
          <p className="text-xl text-gray-300 mb-12">Book your free strategy session and see exactly how we'll grow your business</p>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
            <button className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 mb-6">
              Book Free Strategy Session
            </button>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-green-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                100% Free Strategy Session
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                $5,000 Value Automation Audit Included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 z-50"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Simple Chat Modal */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-slate-800 rounded-2xl shadow-2xl border border-cyan-500/30 z-50 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div>
              <p className="font-bold">ARIA - Growth Analyst</p>
              <p className="text-xs text-green-400">Online now</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4">
            <div className="bg-slate-700 p-3 rounded-lg mb-4">
              <p className="text-sm">Hi! I'm ARIA, your business growth analyst. What's your biggest revenue challenge right now?</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
