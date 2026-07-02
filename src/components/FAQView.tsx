import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { FAQS } from '../data';

interface FAQViewProps {
  setActiveTab: (tab: any) => void;
}

export default function FAQView({ setActiveTab }: FAQViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-view-container" className="animate-fadeIn pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 py-12">
        <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-terracotta">Help Center</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-coffee-950">Frequently Asked Questions</h1>
        <p className="text-sm text-coffee-800/70 max-w-xl mx-auto">
          Need details about remote working, date bookings, dietary ingredients, or bringing your dog? We have gathered answers right here.
        </p>
      </div>

      {/* Accordion Questions */}
      <div className="bg-white rounded-3xl border border-coffee-100 p-6 sm:p-8 shadow-sm space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="border-b border-coffee-100 last:border-b-0 pb-4 last:pb-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-3 flex justify-between items-center gap-4 text-coffee-950 hover:text-terracotta transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-terracotta shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="font-serif font-bold text-sm sm:text-base leading-tight">
                    {faq.question}
                  </span>
                </div>
                <span className="shrink-0 text-coffee-800/40 group-hover:text-terracotta">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="pl-8 pr-4 pb-3 text-xs sm:text-sm text-coffee-800/75 leading-relaxed animate-fadeIn">
                  {faq.answer}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-terracotta bg-coffee-50 px-2 py-0.5 rounded-md">
                      Category: {faq.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unresolved footer callout */}
      <div className="mt-12 bg-coffee-900 text-white rounded-3xl p-6 sm:p-8 text-center border border-coffee-800 shadow relative overflow-hidden">
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-terracotta/15 rounded-full blur-xl" />
        <div className="relative z-10 space-y-4 max-w-md mx-auto">
          <h3 className="font-serif text-lg font-bold">Still Have Questions?</h3>
          <p className="text-xs text-coffee-100/75 leading-relaxed">
            Our team is always online to help you with menu ingredients, custom table arrangements, or special event requests.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-terracotta hover:bg-terracotta-hover text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-transform hover:-translate-y-0.5 shadow cursor-pointer"
            >
              Write Contact Form
            </button>
            <a
              href="https://wa.me/442079460192"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Live Chat</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
