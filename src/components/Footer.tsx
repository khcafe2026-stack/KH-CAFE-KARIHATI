import React, { useState } from 'react';
import { Coffee, Mail, Phone, MapPin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { TabId } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabId) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer-section" className="bg-coffee-950 text-coffee-100/90 pt-16 pb-12 mt-auto border-t-4 border-terracotta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Narrative */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-terracotta text-white">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                KH CAFE
              </span>
            </div>
            <p className="text-sm text-coffee-100/70 leading-relaxed max-w-sm">
              Karihati Cafe, Sonaimuri, Noakhali. Your daily ritual, brewed with love. Enjoy fresh machine tea, coffee, hot snacks, and fast bKash & Nagad banking services.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/kh.cafe.karihati?igsh=MTdrazZ3MmV2dmt4OA==" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-coffee-900 text-coffee-100/80 hover:text-white hover:bg-terracotta transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61591335189554" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-coffee-900 text-coffee-100/80 hover:text-white hover:bg-terracotta transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wider uppercase">
              Explore KH CAFE
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'Our Story' },
                { id: 'menu', label: 'Specialty Menu' },
                { id: 'gallery', label: 'Ambience Gallery' },
                { id: 'reservations', label: 'Table Booking' },
                { id: 'contact', label: 'Get in Touch' },
                { id: 'faq', label: 'Help & FAQs' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id as TabId);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-terracotta transition-colors flex items-center gap-1 group text-coffee-100/70 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wider uppercase">
              Visit or Call
            </h4>
            <div className="space-y-3.5 text-sm text-coffee-100/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>
                  3877 Sonaimuri, karihati Rd<br />
                  noakhali, 3877, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <span>+8801355016567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span>kh.cafe2026@gmail.com</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-coffee-900/50">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Everyday Hours</h5>
              <p className="text-xs text-coffee-100/60">Morning: 8:30 AM – 1:30 PM</p>
              <p className="text-xs text-coffee-100/60">Evening: 3:00 PM – 10:00 PM</p>
            </div>
          </div>

          {/* Newsletter Captures */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wider uppercase">
              Boutique Updates
            </h4>
            <p className="text-sm text-coffee-100/70 leading-relaxed">
              Subscribe to receive private coffee-tip newsletters, recipe guides, and 10% off your next counter order.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-coffee-900/60 border border-terracotta/30 text-center animate-fadeIn">
                <p className="text-sm font-bold text-terracotta mb-0.5">✨ Welcome to the Club!</p>
                <p className="text-xs text-coffee-100/65">Check your inbox for your 10% discount coupon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-coffee-900 text-white rounded-xl py-3 pl-4 pr-10 text-sm border border-coffee-800 focus:outline-none focus:border-terracotta placeholder-coffee-100/40"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-terracotta text-white hover:bg-terracotta-hover transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-coffee-100/40">
                  Unsubscribe anytime. We respect your data.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-coffee-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-coffee-100/55">
          <div>
            &copy; 2026 KH CAFE Ltd. All rights reserved. Specialty Coffee Roasters.
          </div>
          <div className="flex gap-6">
            <button onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-terracotta transition-colors">Privacy Policy</button>
            <button onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-terracotta transition-colors">Terms of Service</button>
            <button onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-terracotta transition-colors">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
