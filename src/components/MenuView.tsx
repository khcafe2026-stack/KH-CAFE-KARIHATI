import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingBag, Plus, Minus, Trash2, X, MessageSquare, ArrowRight, ClipboardCheck, Sparkles } from 'lucide-react';
import { MenuItem, CartItem, CustomizationOption, TabId } from '../types';
import { MENU_ITEMS } from '../data';
import { formatBanglaPrice, toBanglaDigits } from '../utils';

interface MenuViewProps {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, customizations: any) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export default function MenuView({
  cart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  cartOpen,
  setCartOpen
}: MenuViewProps) {
  
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Customization Dialog State
  const [activeCustomItem, setActiveCustomItem] = useState<MenuItem | null>(null);
  
  // Dialog Customization options state
  const [custSize, setCustSize] = useState<'Regular' | 'Large'>('Regular');
  const [custMilk, setCustMilk] = useState<'Whole' | 'Oat' | 'Almond' | 'None'>('Whole');
  const [custSweet, setCustSweet] = useState<'Regular' | 'Less' | 'None'>('Regular');
  const [custExtras, setCustExtras] = useState<string[]>([]);
  const [custQuantity, setCustQuantity] = useState(1);

  // Checkout info
  const [pickupName, setPickupName] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    MENU_ITEMS.forEach(item => item.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Open Customizer for item
  const handleOpenCustomizer = (item: MenuItem) => {
    if (item.customizable) {
      setActiveCustomItem(item);
      setCustSize('Regular');
      setCustMilk('Whole');
      setCustSweet('Regular');
      setCustExtras([]);
      setCustQuantity(1);
    } else {
      // Standard item: Add directly with no customizations
      addToCart(item, 1, {});
    }
  };

  const handleAddCustomizedToCart = () => {
    if (!activeCustomItem) return;
    
    const customConfig = {
      size: custSize,
      milk: activeCustomItem.category === 'coffee' || activeCustomItem.category === 'tea' ? custMilk : undefined,
      sweetness: activeCustomItem.category === 'coffee' || activeCustomItem.category === 'tea' ? custSweet : undefined,
      extra: custExtras
    };

    addToCart(activeCustomItem, custQuantity, customConfig);
    setActiveCustomItem(null);
  };

  // Toggle extras
  const handleToggleExtra = (extra: string) => {
    if (custExtras.includes(extra)) {
      setCustExtras(custExtras.filter(e => e !== extra));
    } else {
      setCustExtras([...custExtras, extra]);
    }
  };

  // Calculate customized unit price
  const activeItemPrice = useMemo(() => {
    if (!activeCustomItem) return 0;
    let base = activeCustomItem.price;
    if (custSize === 'Large') base += 10;
    if (custMilk === 'Oat' || custMilk === 'Almond') base += 15;
    custExtras.forEach(extra => {
      if (extra === 'Extra Shot') base += 20;
      if (extra === 'Whipped Cream') base += 15;
      if (extra === 'Vanilla Syrup') base += 10;
    });
    return base;
  }, [activeCustomItem, custSize, custMilk, custExtras]);

  // Total cart calculation
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const cartTax = cartSubtotal * 0.15; // 15% VAT in Bangladesh
  const cartTotal = cartSubtotal + cartTax;

  // Build WhatsApp Text
  const formatWhatsAppMessage = () => {
    let text = `*☕ NEW KARIHATI CAFE ORDER*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*গ্রাহক (Customer):* ${pickupName || 'Guest'}\n`;
    text += `*সময় (Pickup Time):* ${pickupTime || 'As soon as possible'}\n\n`;
    
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.menuItem.name}* x ${item.quantity}\n`;
      
      const customParts: string[] = [];
      if (item.customizations.size) customParts.push(`Size: ${item.customizations.size}`);
      if (item.customizations.milk) customParts.push(`Milk: ${item.customizations.milk}`);
      if (item.customizations.sweetness) customParts.push(`Sweet: ${item.customizations.sweetness}`);
      if (item.customizations.extra && item.customizations.extra.length > 0) {
        customParts.push(`Extras: [${item.customizations.extra.join(', ')}]`);
      }
      
      if (customParts.length > 0) {
        text += `   _Config: ${customParts.join(' | ')}_\n`;
      }
      text += `   _মূল্য: ৳${Math.round(item.price * item.quantity)}_\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Subtotal:* ৳${Math.round(cartSubtotal)}\n`;
    text += `*VAT (15%):* ৳${Math.round(cartTax)}\n`;
    text += `*GRAND TOTAL:* ৳${Math.round(cartTotal)}\n\n`;
    text += `_দয়া করে আমার অর্ডারটি কনফার্ম করুন। বিকাশ/নগদ পেমেন্ট করতে চাই। ধন্যবাদ!_`;

    return encodeURIComponent(text);
  };

  const handleSendWhatsApp = () => {
    if (!pickupName.trim() || !pickupTime.trim()) {
      alert('অনুগ্রহ করে অর্ডার সম্পন্ন করতে আপনার নাম এবং পিকআপ সময় প্রদান করুন।');
      return;
    }
    const waUrl = `https://wa.me/8801355016567?text=${formatWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setPickupName('');
      setPickupTime('');
      setCheckoutSuccess(false);
      setCartOpen(false);
    }, 5000);
  };

  // Copy details clipboard fallback
  const handleCopyToClipboard = () => {
    const rawText = decodeURIComponent(formatWhatsAppMessage()).replace(/\*/g, '').replace(/_/g, '');
    navigator.clipboard.writeText(rawText);
    alert('📋 Order receipt summary copied to your clipboard!');
  };

  return (
    <div id="menu-view-container" className="animate-fadeIn pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 py-10">
        <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-terracotta">Aesthetic Sips & Bites</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-coffee-950">Our Specialty Menu</h1>
        <p className="text-sm text-coffee-800/70">
          Everything on our menu is prepared using organic, direct-trade single-origin espresso and local farm produce. Clean flavors, zero compromise.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-coffee-100 p-6 shadow-sm space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Inputs */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-coffee-800/40" />
            <input
              type="text"
              placeholder="সার্চ করুন চা, কফি, কেক, বিস্কুট..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-coffee-50 border border-coffee-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-terracotta text-coffee-900"
            />
          </div>

          {/* Category Quick Selectors */}
          <div className="md:col-span-7 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'সব ক্যাটাগরি' },
              { id: 'coffee', label: 'কফি ও চা (Coffee & Tea)' },
              { id: 'tea', label: 'কোল্ড ড্রিংকস (Cold Drinks)' },
              { id: 'breakfast', label: 'স্ন্যাক্স ও খাবার (Snacks)' },
              { id: 'pastries', label: 'শুকনো খাবার (Bakery)' },
              { id: 'desserts', label: 'মিষ্টি খাবার (Desserts)' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-coffee-800 text-white shadow-sm'
                    : 'bg-coffee-50 text-coffee-800 hover:bg-coffee-100/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Dietary and Tag filter row */}
        <div className="pt-4 border-t border-coffee-50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-terracotta" />
            <span className="text-xs font-bold text-coffee-900">Dietary Filters:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-terracotta text-white'
                  : 'bg-coffee-50 text-coffee-800 hover:bg-coffee-100/30'
              }`}
            >
              All Diets
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-terracotta text-white'
                    : 'bg-coffee-50 text-coffee-800 hover:bg-coffee-100/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Grid of items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-coffee-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail header */}
              <div className="relative aspect-4/3 overflow-hidden bg-coffee-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-extrabold uppercase tracking-wide bg-coffee-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-xl text-sm font-bold text-coffee-900 shadow-sm border border-coffee-100/20">
                  {formatBanglaPrice(item.price)}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-lg font-bold text-coffee-950">{item.name}</h3>
                    {item.customizable && (
                      <span className="shrink-0 text-[10px] font-extrabold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Customisable
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-coffee-800/70 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-coffee-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-coffee-800/40 uppercase tracking-widest">{item.category}</span>
                  <button
                    onClick={() => handleOpenCustomizer(item)}
                    className="bg-coffee-50 hover:bg-terracotta hover:text-white text-coffee-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-inner"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{item.customizable ? 'Customize' : 'Add to Order'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-16 bg-white rounded-3xl border border-coffee-100 max-w-md mx-auto space-y-3">
          <p className="text-base font-bold text-coffee-900">No menu items found</p>
          <p className="text-xs text-coffee-800/60 leading-relaxed">
            We couldn't find anything matching your filters or search keywords. Try adjusting your filters or clearing search.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedTag('all'); }} 
            className="text-xs font-bold text-terracotta hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}


      {/* 4. MODAL: Customization Drawer for Drinks */}
      {activeCustomItem && (
        <div className="fixed inset-0 bg-coffee-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-coffee-100 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-cafe-bg text-coffee-950 p-6 relative border-b border-coffee-100">
              <button 
                onClick={() => setActiveCustomItem(null)}
                className="absolute top-5 right-5 text-coffee-800/60 hover:text-coffee-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-terracotta block mb-1">Interactive Brew Builder</span>
              <h3 className="font-serif text-xl font-bold">{activeCustomItem.name}</h3>
              <p className="text-xs text-coffee-800/70 mt-1 line-clamp-1">{activeCustomItem.description}</p>
            </div>

            {/* Customiser body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow text-sm">
              
              {/* Option 1: Size */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-coffee-900 uppercase tracking-wider block">1. Select Size</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'Regular', label: 'রেগুলার (Regular)', price: 'Base' },
                    { id: 'Large', label: `লার্জ (Large) (+${formatBanglaPrice(10)})`, price: '+৳১০' }
                  ].map(sz => (
                    <button
                      key={sz.id}
                      onClick={() => setCustSize(sz.id as any)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                        custSize === sz.id
                          ? 'border-terracotta bg-coffee-50 text-terracotta font-bold'
                          : 'border-coffee-100 bg-transparent text-coffee-800'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Milk (Drinks only) */}
              {(activeCustomItem.category === 'coffee' || activeCustomItem.category === 'tea') && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-coffee-900 uppercase tracking-wider block">2. Choice of Milk</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Whole', label: 'রেগুলার দুধ (Whole Milk)' },
                      { id: 'Oat', label: `ওট মিল্ক (+${formatBanglaPrice(15)})` },
                      { id: 'Almond', label: `অ্যালমন্ড মিল্ক (+${formatBanglaPrice(15)})` },
                      { id: 'None', label: 'রং চা / দুধ ছাড়া (Black)' }
                    ].map(mk => (
                      <button
                        key={mk.id}
                        onClick={() => setCustMilk(mk.id as any)}
                        className={`py-2.5 px-3 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                          custMilk === mk.id
                            ? 'border-terracotta bg-coffee-50 text-terracotta font-bold'
                            : 'border-coffee-100 bg-transparent text-coffee-800'
                        }`}
                      >
                        {mk.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Option 3: Sweetness (Drinks only) */}
              {(activeCustomItem.category === 'coffee' || activeCustomItem.category === 'tea') && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-coffee-900 uppercase tracking-wider block">3. Sweetness Level</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Regular', label: 'স্বাভাবিক (Regular)' },
                      { id: 'Less', label: 'কম মিষ্টি (Less)' },
                      { id: 'None', label: 'চিনি ছাড়া (None)' }
                    ].map(sw => (
                      <button
                        key={sw.id}
                        onClick={() => setCustSweet(sw.id as any)}
                        className={`py-2.5 px-3 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                          custSweet === sw.id
                            ? 'border-terracotta bg-coffee-50 text-terracotta font-bold'
                            : 'border-coffee-100 bg-transparent text-coffee-800'
                        }`}
                      >
                        {sw.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Option 4: Extras */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-coffee-900 uppercase tracking-wider block">4. Upgrade & Add-ons</span>
                <div className="space-y-2">
                  {[
                    { id: 'Extra Shot', label: `অতিরিক্ত কফি শট Extra Shot (+${formatBanglaPrice(20)})` },
                    { id: 'Whipped Cream', label: `হুইপড ক্রিম Whipped Cream (+${formatBanglaPrice(15)})` },
                    { id: 'Vanilla Syrup', label: `ভ্যানিলা সিরাপ Vanilla Syrup (+${formatBanglaPrice(10)})` }
                  ].map(ex => {
                    const isChecked = custExtras.includes(ex.id);
                    return (
                      <label 
                        key={ex.id}
                        onClick={() => handleToggleExtra(ex.id)}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'border-terracotta bg-coffee-50 text-terracotta font-semibold'
                            : 'border-coffee-100 bg-transparent text-coffee-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="w-4 h-4 accent-terracotta shrink-0"
                        />
                        <span className="text-xs">{ex.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Option 5: Quantity */}
              <div className="flex items-center justify-between pt-4 border-t border-coffee-50">
                <span className="font-bold text-coffee-950">Quantity:</span>
                <div className="flex items-center gap-3 border border-coffee-100 rounded-xl p-1.5 bg-coffee-50">
                  <button
                    disabled={custQuantity <= 1}
                    onClick={() => setCustQuantity(custQuantity - 1)}
                    className="p-1 rounded-lg text-coffee-800 hover:bg-white disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm w-6 text-center">{custQuantity}</span>
                  <button
                    onClick={() => setCustQuantity(custQuantity + 1)}
                    className="p-1 rounded-lg text-coffee-800 hover:bg-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Customiser Footer */}
            <div className="p-6 bg-coffee-50 border-t border-coffee-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-coffee-800/50 uppercase block font-semibold">মোট মূল্য (Total)</span>
                <span className="text-xl font-extrabold text-coffee-950">{formatBanglaPrice(activeItemPrice * custQuantity)}</span>
              </div>
              <button
                onClick={handleAddCustomizedToCart}
                className="bg-terracotta hover:bg-terracotta-hover text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow cursor-pointer"
              >
                অর্ডারে যোগ করুন
              </button>
            </div>

          </div>
        </div>
      )}


      {/* 5. SIDEBAR: Cart / Order Ahead Panel */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-coffee-950/40 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-coffee-100">
            
            {/* Header */}
            <div className="p-6 border-b border-coffee-100 flex justify-between items-center bg-cafe-bg text-coffee-950">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-terracotta" />
                <h3 className="font-serif text-lg font-bold">Your Counter Order</h3>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-lg text-coffee-800/60 hover:text-coffee-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart list */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-coffee-50/50 border border-coffee-100/40 shadow-sm relative">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 text-coffee-800/45 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-coffee-100 shrink-0">
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-2 flex-grow pr-6">
                      <h4 className="font-serif font-bold text-coffee-900 text-sm leading-tight">{item.menuItem.name}</h4>
                      
                      {/* Cust indicators */}
                      {(item.customizations.size || item.customizations.milk || item.customizations.sweetness || (item.customizations.extra && item.customizations.extra.length > 0)) && (
                        <div className="text-[10px] text-coffee-800/60 leading-relaxed space-y-0.5">
                          {item.customizations.size && <div>Size: <span className="font-bold text-coffee-900">{item.customizations.size}</span></div>}
                          {item.customizations.milk && <div>Milk: <span className="font-bold text-coffee-900">{item.customizations.milk}</span></div>}
                          {item.customizations.sweetness && <div>Sweet: <span className="font-bold text-coffee-900">{item.customizations.sweetness}</span></div>}
                          {item.customizations.extra && item.customizations.extra.length > 0 && (
                            <div className="line-clamp-1">Extras: <span className="font-bold text-coffee-900">{item.customizations.extra.join(', ')}</span></div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-coffee-950">{formatBanglaPrice(item.price * item.quantity)}</span>
                        
                        {/* Adjust qty */}
                        <div className="flex items-center gap-2 border border-coffee-100/70 rounded-lg p-0.5 bg-white">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded text-coffee-800 hover:bg-coffee-50 disabled:opacity-40 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded text-coffee-800 hover:bg-coffee-50 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 space-y-4">
                  <div className="p-4 rounded-full bg-coffee-50 text-coffee-800/40 inline-block">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-coffee-900">Your basket is empty</h4>
                    <p className="text-xs text-coffee-800/60 mt-1 max-w-xs mx-auto">
                      Explore our specialty espresso bar and warm baked goodies to add your favorite items.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Form */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-coffee-100 bg-coffee-50 space-y-4 shadow-inner">
                
                {/* Inputs */}
                {checkoutSuccess ? (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center space-y-1.5 animate-fadeIn">
                    <ClipboardCheck className="w-6 h-6 text-green-600 mx-auto" />
                    <p className="text-xs font-bold text-green-900">✨ Order Transmitted!</p>
                    <p className="text-[10px] text-green-800/80 leading-relaxed">
                      We have formulated your WhatsApp booking payload. We are preparing your fresh brew at our counter!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-coffee-800/50 uppercase tracking-widest block">Pickup Information</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-coffee-800 font-bold block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={pickupName}
                          onChange={(e) => setPickupName(e.target.value)}
                          placeholder="Kenji H."
                          className="w-full bg-white border border-coffee-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-coffee-800 font-bold block mb-1">Pickup Time</label>
                        <input
                          type="time"
                          required
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-white border border-coffee-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing Summary */}
                <div className="space-y-2 text-xs pt-2 border-t border-coffee-100/50">
                  <div className="flex justify-between text-coffee-800/80">
                    <span>উপমোট (Subtotal):</span>
                    <span>{formatBanglaPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-coffee-800/80">
                    <span>ভ্যাট ভ্যাট (15% VAT):</span>
                    <span>{formatBanglaPrice(cartTax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-coffee-950 pt-1 border-t border-dashed border-coffee-200/50">
                    <span>সর্বমোট (Grand Total):</span>
                    <span>{formatBanglaPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA actions */}
                {!checkoutSuccess && (
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <button
                      onClick={handleSendWhatsApp}
                      disabled={!pickupName.trim() || !pickupTime.trim()}
                      className="w-full bg-terracotta hover:bg-terracotta-hover disabled:bg-coffee-800/30 text-white py-3.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send Order to WhatsApp</span>
                    </button>
                    <button
                      onClick={handleCopyToClipboard}
                      className="w-full bg-white hover:bg-coffee-50 text-coffee-800 border border-coffee-200 py-2.5 rounded-xl text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Copy Order Receipt</span>
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
