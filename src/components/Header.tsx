import React, { useState } from 'react';
import { Coffee, Menu, X, ShoppingBag, ShieldCheck } from 'lucide-react';
import { TabId } from '../types';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, onOpenCart }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ] as const;

  const handleNavClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header id="header-container" className="sticky top-0 z-40 w-full bg-cafe-bg/90 backdrop-blur-md border-b border-coffee-100 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo"
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-9 h-9 bg-coffee-700 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-serif text-xl font-bold leading-none">K</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-tighter text-coffee-900 block leading-none">
                KH CAFE
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-terracotta block mt-1">
                Boutique Roastery
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer border-b-2 ${
                  activeTab === item.id
                    ? 'text-coffee-900 border-terracotta'
                    : 'text-coffee-800/70 border-transparent hover:text-coffee-900 hover:border-coffee-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div id="header-actions" className="hidden md:flex items-center gap-4">
            {/* Admin Access Portal */}
            <button
              id="admin-portal-btn"
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center relative group ${
                activeTab === 'admin'
                  ? 'bg-coffee-700 text-coffee-100 border-coffee-700'
                  : 'bg-transparent text-coffee-800/60 border-coffee-100 hover:text-coffee-900 hover:border-coffee-700/30'
              }`}
              title="Staff Portal"
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 bg-coffee-900 text-coffee-50 text-[10px] px-2 py-1 rounded font-sans transition-all whitespace-nowrap shadow z-50">
                Staff Admin
              </span>
            </button>

            {/* Cart Widget */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="p-2.5 rounded-full border border-coffee-100 bg-white/60 text-coffee-800 hover:text-terracotta hover:border-terracotta/30 transition-all duration-300 cursor-pointer relative animate-fadeIn"
              title="View Cart / Order"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Main Reservation Call-to-Action */}
            <button
              id="header-reserve-cta"
              onClick={() => handleNavClick('reservations')}
              className="bg-coffee-700 hover:bg-coffee-800 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-lg shadow-coffee-700/10 hover:shadow-coffee-700/20 transition-all duration-300 cursor-pointer"
            >
              Reserve Table
            </button>
          </div>

          {/* Mobile Actions and Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Small screen Cart */}
            <button
              id="cart-trigger-mobile"
              onClick={onOpenCart}
              className="p-2 rounded-lg border border-coffee-100 bg-white text-coffee-800 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Nav Trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-coffee-100 bg-white text-coffee-800 hover:text-terracotta transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-coffee-100 bg-cafe-bg animate-fadeIn">
          <div className="px-2 pt-3 pb-6 space-y-1.5 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold tracking-wide transition-all ${
                  activeTab === item.id
                    ? 'text-terracotta bg-coffee-100/40 font-bold'
                    : 'text-coffee-800/80 hover:text-terracotta hover:bg-coffee-100/20'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold tracking-wide border flex items-center justify-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-coffee-800 text-white border-coffee-800'
                    : 'bg-white text-coffee-800 border-coffee-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Staff Portal
              </button>
              
              <button
                onClick={() => handleNavClick('reservations')}
                className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3 rounded-xl text-sm font-bold text-center shadow-sm"
              >
                Book a Table
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
