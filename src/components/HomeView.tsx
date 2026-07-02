import React from 'react';
import { Coffee, MapPin, Calendar, Compass, ArrowRight, ShieldCheck, Heart, Sparkles, Star, Wifi, Footprints, Laptop } from 'lucide-react';
import { TabId } from '../types';
import { MENU_ITEMS, TESTIMONIALS } from '../data';
import { formatBanglaPrice } from '../utils';

interface HomeViewProps {
  setActiveTab: (tab: TabId) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  // Get 3 highlight items
  const highlightedItems = MENU_ITEMS.filter(item => 
    ['c1', 'b1', 'd1'].includes(item.id)
  );

  return (
    <div id="home-view-container" className="animate-fadeIn pb-12">
      
      {/* 1. Hero Banner */}
      <section id="hero-banner" className="relative lg:min-h-[580px] flex flex-col md:flex-row items-stretch bg-cafe-bg overflow-hidden border-b border-coffee-100">
        
        {/* Left column: Typography & CTAs */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-24 space-y-6">
          <span className="text-terracotta font-semibold tracking-[0.25em] uppercase text-xs">
            ESTD 2026 • Karihati, Bangladesh
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-coffee-900 tracking-tight leading-[1.1]">
            KARIHATI CAFE <br />
            <span className="italic font-normal text-terracotta">স্বাদে ও আস্থায় সেরা।</span>
          </h1>
          
          <p className="text-sm sm:text-base text-coffee-800/80 leading-relaxed max-w-md">
            আমাদের চা-মেশিনে তৈরি স্পেশাল রং চা, মিল্ক টি, এবং কফি সবসময়ই থাকে একই রকম পারফেক্ট স্বাদে। সাথে পাবেন তাজা স্ন্যাক্স এবং অতি দ্রুত বিকাশ ও নগদ সেবা!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('menu')}
              className="w-full sm:w-auto bg-coffee-700 hover:bg-coffee-800 text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-lg shadow-coffee-700/10 hover:shadow-coffee-700/20 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="w-full sm:w-auto bg-transparent hover:bg-coffee-100/30 text-coffee-800 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-coffee-200 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Read Our Story</span>
            </button>
          </div>
        </div>

        {/* Right column: Image with elegant Clip Path and floating Testimonial */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-[#D4C4B5]"
            style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            <img 
              src="/src/assets/images/cafe_hero_1782466885010.jpg"
              alt="KH Cafe Interior Space"
              className="w-full h-full object-cover opacity-90 hover:scale-102 transition-transform duration-[8000ms]"
              onError={(e) => {
                // Fallback to high-quality unsplash image if local is not fully loaded
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1501339817302-ec44d142b15a?q=80&w=1200&auto=format&fit=crop";
              }}
            />
            {/* Ambient vignette overlay inside the clipped wrapper */}
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/20 to-transparent" />
          </div>

          {/* Clean Floating Testimonial Overlay */}
          <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-coffee-100 max-w-[280px] hidden sm:block animate-fadeIn">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-amber-gold text-sm">★</span>
              ))}
            </div>
            <p className="text-xs italic text-coffee-800/90 leading-relaxed">
              "চা-মেশিনের মিল্ক টি এবং ডিম টোস্টের স্বাদ জাস্ট অসাধারণ! পরিচ্ছন্ন পরিবেশ এবং চমৎকার ব্যবহার।"
            </p>
            <p className="text-[10px] font-bold mt-2.5 uppercase tracking-wider text-coffee-950">
              — তারেক রহমান
            </p>
          </div>
        </div>

      </section>

      {/* 2. Core Strengths ("Why Choose Us") */}
      <section id="strengths-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Coffee className="w-6 h-6 text-terracotta" />,
              title: "পারফেক্ট স্বাদ",
              desc: "আমাদের কফি ও চা মেশিনে তৈরি প্রতিটি কাপের স্বাদ থাকে একদম পারফেক্ট ও ফ্রেশ।"
            },
            {
              icon: <Laptop className="w-6 h-6 text-terracotta" />,
              title: "বিকাশ ও নগদ",
              desc: "অর্ডার করার পাশাপাশি পাবেন দ্রুত ও নিরাপদ bKash এবং Nagad পার্সোনাল ব্যাংকিং সেবা।"
            },
            {
              icon: <Footprints className="w-6 h-6 text-terracotta" />,
              title: "পরিচ্ছন্ন পরিবেশ",
              desc: "পারিবারিক আড্ডা ও কাজের জন্য অত্যন্ত ছিমছাম, পরিচ্ছন্ন ও নিরিবিলি বসার ব্যবস্থা।"
            },
            {
              icon: <Heart className="w-6 h-6 text-terracotta" />,
              title: "তাজা স্ন্যাক্স",
              desc: "প্রতিদিন ওভেনে তৈরি গরম গরম ড্রাই কেক, টোস্ট বিস্কুট এবং ক্রিস্পি প্যাটিস।"
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-white border border-coffee-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="mb-4 p-3 rounded-xl bg-coffee-50 inline-block">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-coffee-900 mb-1.5">{item.title}</h3>
              <p className="text-xs text-coffee-800/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About Snapshot */}
      <section id="about-snapshot" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-coffee-100/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-coffee-100">
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
                alt="Kenji brewing siphon coffee"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay badge card */}
            <div className="absolute -bottom-6 -right-6 bg-coffee-800 text-white p-5 rounded-2xl shadow-xl max-w-xs border border-coffee-700 hidden sm:block">
              <span className="font-serif text-2xl font-extrabold text-terracotta block">১০০% ফ্রেশ</span>
              <span className="text-xs text-coffee-100/80 uppercase tracking-widest font-medium">আমাদের চা, কফি ও স্ন্যাক্সে বজায় থাকে সর্বোচ্চ পরিচ্ছন্নতা</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="text-terracotta font-serif italic text-base">একটি বিশ্বস্ত মিলনমেলা ও ক্যাফে</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900 tracking-tight leading-tight">
              সোনাইমুড়ীর কারিহাটি বাজারে আড্ডা ও সেরা স্বাদের নির্ভরযোগ্য স্থান।
            </h2>
            <p className="text-sm sm:text-base text-coffee-800/80 leading-relaxed">
              KARIHATI CAFE (KH CAFE) নোয়াখালীর কারিহাটিতে অবস্থিত একটি আধুনিক ক্যাফে। আমাদের এখানে চা-মেশিনে নিখুঁत স্বাদে তৈরি মিল্ক টি ও কফির সাথে থাকছে তাজা ড্রাই কেক এবং টোস্ট বিস্কুট। এছাড়াও একই ছাদের নিচে বিকাশ ও নগদ লেনদেনের সুবিধা রয়েছে।
            </p>
            <p className="text-sm text-coffee-800/70 leading-relaxed">
              আমরা সর্বোচ্চ পরিষ্কার-পরিচ্ছন্নতা বজায় রেখে দ্রুত সার্ভিস নিশ্চিত করি। বন্ধুদের সাথে জমাটি আড্ডা হোক বা প্রয়োজনীয় বিকাশ/নগদ পেমেন্ট, আমরা আপনার হাসিমুখে সেবা দিতে প্রস্তুত!
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center gap-2 font-bold text-terracotta hover:text-terracotta-hover transition-colors group cursor-pointer"
              >
                <span>Read Our Founding Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Menu Highlights */}
      <section id="menu-highlights" className="bg-coffee-50/55 py-20 border-y border-coffee-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta block">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900 tracking-tight">
              আমাদের স্পেশাল কিছু আইটেম
            </h2>
            <p className="text-sm text-coffee-800/75 leading-relaxed">
              আফরিন জাহান এবং রাসেল আহমেদের পরম যত্নে তৈরি আমাদের জনপ্রিয় ও সুস্বাদু কিছু খাবার ও পানীয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightedItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-coffee-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-coffee-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-extrabold uppercase bg-coffee-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl text-sm font-bold text-coffee-900 shadow">
                    {formatBanglaPrice(item.price)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-coffee-900 mb-1.5">{item.name}</h3>
                    <p className="text-xs text-coffee-800/70 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-coffee-50 flex items-center justify-between">
                    <span className="text-[10px] text-terracotta uppercase tracking-widest font-semibold">{item.category} Highlight</span>
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="text-xs font-bold text-coffee-800 hover:text-terracotta transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Custom Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setActiveTab('menu')}
              className="bg-coffee-800 hover:bg-coffee-900 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow hover:shadow-md cursor-pointer"
            >
              See Our Full Menu
            </button>
          </div>

        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta block">Loved by regulars</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900 tracking-tight">Our Guests Speak For Us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div 
              key={review.id}
              className="p-8 rounded-2xl bg-white border border-coffee-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-gold text-amber-gold" />
                  ))}
                </div>
                <p className="text-sm italic text-coffee-800/80 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-coffee-50">
                <p className="text-sm font-bold text-coffee-950">{review.name}</p>
                <p className="text-xs text-terracotta">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Instagram & Gallery Teaser */}
      <section id="gallery-teaser" className="bg-coffee-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="font-serif text-3xl font-bold">A Peek Inside Our Coffee Sanctuary</h3>
          <p className="text-coffee-100/85 max-w-xl mx-auto text-sm">
            আমাদের চা-কফি বানানোর প্রক্রিয়া এবং ওভেনে স্ন্যাক্স বেক করার কিছু সুন্দর মুহূর্ত দেখতে পারেন। কারিহাটি বাজারের শ্রেষ্ঠ পরিবেশে আপনার আগমন আমাদের আনন্দিত করে!
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('gallery')}
              className="bg-terracotta hover:bg-terracotta-hover text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Open Ambient Gallery
            </button>
          </div>
        </div>
      </section>

      {/* 7. Location & Hours */}
      <section id="hours-location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Schedule */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-white border border-coffee-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-terracotta">Location</span>
                <h3 className="font-serif text-2xl font-bold text-coffee-900 mt-1">Our Cozy Store</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                  <p className="text-sm text-coffee-800/80 leading-relaxed">
                    3877 Sonaimuri, karihati Rd <br />
                    noakhali, 3877, Bangladesh <br />
                    <span className="text-xs font-semibold text-terracotta">কারিহাটি বাজার রোড সংলগ্ন</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-coffee-100">
                <h4 className="text-sm font-bold text-coffee-950 uppercase tracking-wider mb-3">প্রতিদিনের সময়সূচী (Everyday Schedule)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-coffee-800">
                    <span>সকালের শিফট (Morning Shift)</span>
                    <span className="font-semibold">8:30 AM – 1:30 PM</span>
                  </div>
                  <div className="flex justify-between text-coffee-800">
                    <span>বিকেলের শিফট (After Break)</span>
                    <span className="font-semibold">3:00 PM – 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=KARIHATI+CAFE+Sonaimuri+Noakhali"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-coffee-800 hover:bg-coffee-950 text-white py-3.5 rounded-xl text-sm font-bold text-center block shadow transition-colors"
              >
                গুগল ম্যাপস ডিরেকশন
              </a>
            </div>
          </div>

          {/* Interactive Visual Neighborhood Guide */}
          <div className="lg:col-span-7 bg-coffee-100/30 rounded-2xl border border-coffee-100 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 z-10">
              <span className="text-xs uppercase tracking-widest font-bold text-terracotta">সহজ ম্যাপ গাইড</span>
              <h3 className="font-serif text-2xl font-bold text-coffee-900">কিভাবে আমাদের পাবেন</h3>
              <p className="text-sm text-coffee-800/80">
                নোয়াখালীর সোনাইমুড়ীর ঐতিহ্যবাহী কারিহাটি বাজার চৌরাস্তা সংলগ্ন এলাকায় আমাদের অবস্থান। আপনি বাজারের মেইন রোড দিয়ে আমাদের লাল ও মাটির রঙের আকর্ষণীয় ক্যাফে সাইনবোর্ডটি সহজেই দেখতে পাবেন।
              </p>
            </div>
            
            {/* Visual Neighborhood map placeholder */}
            <div className="my-6 aspect-16/9 bg-white border border-coffee-100/50 rounded-xl relative p-4 shadow-inner flex flex-col justify-center items-center text-center">
              <Compass className="w-10 h-10 text-terracotta mb-2 stroke-[1.2] animate-spin-slow" />
              <div className="text-xs font-bold text-coffee-900 mb-1">কারিহাটি ক্যাফে লোকেশন ম্যাপ</div>
              <div className="text-[10px] text-coffee-800/60 leading-relaxed max-w-sm">
                সোনাইমুড়ী সোনালী ব্যাংক মোড় → সোজা কারিহাটি রোড ধরে ৫ কি.মি. এগিয়ে আসুন → কারিহাটি বাজারের প্রাণকেন্দ্রে সড়কের বাম পাশে আমাদের উজ্জ্বল ক্যাফেটি অবস্থিত।
              </div>
              
              {/* Floating points */}
              <div className="absolute top-1/3 left-1/2 p-1.5 rounded-full bg-terracotta animate-pulse text-white text-[8px] font-bold shadow">
                KARIHATI CAFE
              </div>
              <div className="absolute bottom-1/4 right-1/3 p-1 rounded-full bg-coffee-700 text-white text-[7px] font-bold opacity-80">
                Karihati Rd
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-coffee-100 pt-4 z-10">
              <span className="text-xs text-coffee-800/60">💡 টিপ: আমাদের ক্যাফের সামনে নিরাপদ মোটরসাইকেল ও সাইকেল পার্কিং রয়েছে।</span>
              <button
                onClick={() => setActiveTab('contact')}
                className="text-xs font-bold text-terracotta hover:text-terracotta-hover transition-colors shrink-0"
              >
                Send Us Message Instead
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Final CTA Reservation Banner */}
      <section id="final-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-coffee-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-xl border border-coffee-800">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-terracotta/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-coffee-800/40 rounded-full blur-3xl" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              সেরা স্বাদের এক কাপ চা বা কফি চান?
            </h2>
            <p className="text-sm sm:text-base text-coffee-100/80 leading-relaxed">
              লাইন এড়িয়ে সরাসরি কাউন্টার থেকে আপনার অর্ডার সংগ্রহ করতে আজই অনলাইনে অর্ডার করে হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে দিন!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => setActiveTab('reservations')}
                className="bg-terracotta hover:bg-terracotta-hover text-white px-8 py-4 rounded-xl text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Reserve Your Seating Spot
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-xl text-sm font-bold backdrop-blur-sm hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Order Online Ahead
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
