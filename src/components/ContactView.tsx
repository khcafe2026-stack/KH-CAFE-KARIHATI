import React, { useState } from 'react';
import { Mail, Phone, MapPin, Star, MessageSquare, Compass, Send, CheckCircle } from 'lucide-react';
import { Feedback } from '../types';

interface ContactViewProps {
  onAddFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => void;
}

export default function ContactView({ onAddFeedback }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('⚠️ Please complete all required form fields.');
      return;
    }

    onAddFeedback({
      name,
      email,
      message,
      rating
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setRating(5);
  };

  return (
    <div id="contact-view-container" className="animate-fadeIn pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 py-10">
        <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-terracotta">We'd Love to Hear From You</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-coffee-950">Get in Touch</h1>
        <p className="text-sm text-coffee-800/70">
          Have a question about our roasting process, private events, or simply want to leave a review of Anya's latte art? Use the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
        
        {/* Left 7 Columns: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-coffee-100 p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-16 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-green-200">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-coffee-950">Message Received!</h3>
                <p className="text-xs text-coffee-800/60 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you for sharing your feedback with KH CAFE. Our founders review all messages, and we will get back to you via email within 24 hours if requested.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-terracotta hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-coffee-50 pb-4">
                <h3 className="font-serif text-lg font-bold text-coffee-950">Feedback & General Queries</h3>
                <p className="text-xs text-coffee-800/60 mt-0.5">Let us know about your in-store experience or make an inquiry.</p>
              </div>

              {/* Star Rating Selectors */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-coffee-900 block">Rate Your Experience (optional):</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= (hoveredStar ?? rating)
                            ? 'fill-amber-gold text-amber-gold'
                            : 'text-coffee-200'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-terracotta ml-3 font-sans">
                    {rating === 5 && '🌟 Out of this world!'}
                    {rating === 4 && '✨ Loved it!'}
                    {rating === 3 && '👍 Quite good'}
                    {rating === 2 && '😐 Average'}
                    {rating === 1 && '😞 Needs improvements'}
                  </span>
                </div>
              </div>

              {/* Standard inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-coffee-800 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kenji Harasawa"
                    className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-coffee-800 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kenji@email.com"
                    className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-coffee-800 block mb-1">Write Your Message *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what is on your mind..."
                  rows={5}
                  className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                />
              </div>

              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

            </form>
          )}
        </div>

        {/* Right 5 Columns: Info panel */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-coffee-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-coffee-800 shadow">
            
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">Store Info</span>
              <h3 className="font-serif text-xl font-bold mt-1">KARIHATI CAFE Store</h3>
            </div>

            <div className="space-y-4 text-sm text-coffee-100/80">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <p className="leading-relaxed text-xs">
                  3877 Sonaimuri, karihati Rd<br />
                  noakhali, 3877, Bangladesh
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-terracotta shrink-0" />
                <p className="text-xs">+8801355016567</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-terracotta shrink-0" />
                <p className="text-xs">kh.cafe2026@gmail.com</p>
              </div>
            </div>

            <div className="pt-4 border-t border-coffee-800 text-xs text-coffee-100/60 leading-normal space-y-1">
              <p className="font-bold text-white uppercase tracking-wider mb-2">Private Bookings</p>
              <p>For custom catering, barista bookings, and visual photo shoot setups, please write to us directly at <span className="text-terracotta font-bold">kh.cafe2026@gmail.com</span>.</p>
            </div>

          </div>

          {/* Schedule card */}
          <div className="bg-white rounded-3xl border border-coffee-100 p-6 sm:p-8 shadow-sm space-y-4">
            <h4 className="font-serif text-lg font-bold text-coffee-950">Store Schedule</h4>
            <div className="space-y-3.5 text-xs text-coffee-800">
              <div className="flex justify-between items-center border-b border-coffee-50 pb-2">
                <span className="font-semibold">Morning Session</span>
                <span>8:30 AM – 1:30 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-coffee-50 pb-2">
                <span className="font-semibold">Evening Session</span>
                <span>3:00 PM – 10:00 PM</span>
              </div>
              <p className="text-[10px] text-coffee-800/50 leading-relaxed italic">
                * Note: Open everyday with a break between 1:30 PM and 3:00 PM.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
