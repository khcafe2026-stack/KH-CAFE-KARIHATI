import React from 'react';
import { Calendar, Compass, ShieldAlert, Award, Sprout, Heart, Users } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';

export default function AboutView() {
  return (
    <div id="about-view-container" className="animate-fadeIn pb-16">
      
      {/* 1. Page Header */}
      <section className="bg-cafe-bg text-coffee-900 py-16 relative overflow-hidden border-b border-coffee-100">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-terracotta">Our Roots</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-coffee-950">The Story Behind KH CAFE</h1>
          <p className="text-coffee-800/75 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            সোনাইমুড়ীর কারিহাটি বাজারে একটি আধুনিক, পরিচ্ছন্ন ও সুন্দর আড্ডা এবং লেনদেন বান্ধব ক্যাফে প্রতিষ্ঠার গল্প।
          </p>
        </div>
      </section>

      {/* 2. Brand Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Block 1: The Spark */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider">Our Dream</span>
            <h2 className="font-serif text-3xl font-bold text-coffee-900 leading-tight">
              Two Friends, One Simple Dream
            </h2>
            <p className="text-sm text-coffee-800/80 leading-relaxed">
              KH CAFE began with a simple dream shared by two friends: <strong>AH Nilay</strong>, the founder with a passion for creativity and hospitality, and <strong>Fahim</strong>, the managing partner whose dedication and discipline turned that dream into reality.
            </p>
            <p className="text-sm text-coffee-800/70 leading-relaxed">
              Together, we wanted to build a place in Karihati where people could slow down, enjoy fresh coffee, taste delicious snacks, and feel at home. A space filled with warmth, comfort, and community — not just another café, but a meeting point for friends, families, and everyday moments.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md border border-coffee-100">
            <img 
              src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800"
              alt="Harvesting organic coffee beans"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Block 2: Our Promise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
          <div className="lg:order-2 space-y-6">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider">Our Promise</span>
            <h2 className="font-serif text-3xl font-bold text-coffee-900 leading-tight">
              Commitment to Quality & Karihati
            </h2>
            <p className="text-sm text-coffee-800/80 leading-relaxed">
              Every cup we serve, every plate we prepare, carries our commitment to quality, freshness, and heartfelt service. KH CAFE is more than a business — it’s our story, our passion, and our promise to Karihati.
            </p>
            <p className="text-sm text-coffee-800/70 leading-relaxed">
              আমাদের প্রতিটি কাপ চা বা কফি এবং প্রতি প্লেট খাবার তৈরিতে থাকে আমাদের সর্বোচ্চ গুণগত মান ও আস্থার প্রতিশ্রুতি। কারিহাটি ক্যাফে কেবল একটি ব্যবসা নয়, এটি আমাদের ভালোবাসা, স্বপ্ন ও কারিহাটির প্রতি এক অফুরন্ত অঙ্গীকার।
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md border border-coffee-100 lg:order-1">
            <img 
              src="/src/assets/images/menu_latte_art_1782466899530.jpg"
              alt="Latte and Croissant detail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* 3. Meet the Team Section */}
      <section className="bg-coffee-100/25 py-20 border-y border-coffee-100/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-terracotta">Our Craftspeople</span>
            <h2 className="font-serif text-3xl font-bold text-coffee-900">Meet the Creators</h2>
            <p className="text-sm text-coffee-800/70">
              The passionate hands behind your daily extraction, frothing, and baking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-2xl border border-coffee-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-coffee-50 relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coffee-950/60 to-transparent p-4 flex items-end">
                    <div>
                      <h4 className="text-white font-bold text-lg">{member.name}</h4>
                      <p className="text-terracotta text-xs font-semibold">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-coffee-800/50 font-bold">Fun Fact</span>
                    <p className="text-sm text-coffee-800/80 leading-relaxed italic">
                      "{member.fact}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Brand Values section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-terracotta">Core Values</span>
          <h2 className="font-serif text-3xl font-bold text-coffee-900">What Drives Us Every Day</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Sprout className="w-8 h-8 text-terracotta" />,
              title: "পরিচ্ছন্ন ও সতেজ পরিবেশ (Clean Ambiance)",
              desc: "আমরা আমাদের ক্যাফেটি সবসময় অত্যন্ত পরিচ্ছন্ন রাখি যাতে আপনি পরিবার বা বন্ধুদের সাথে একটি সুন্দর এবং নিরাপদ সময় কাটাতে পারেন।"
            },
            {
              icon: <Award className="w-8 h-8 text-terracotta" />,
              title: "পরিশুদ্ধ আধুনিক প্রযুক্তি (Pure Brewing)",
              desc: "আমাদের আধুনিক চা ও কফি ব্রুয়িং মেশিন প্রতি কাপে সবসময় একদম একই রকম পারফেক্ট স্বাদ, মান এবং চমৎকার সুবাস বজায় রাখে।"
            },
            {
              icon: <Users className="w-8 h-8 text-terracotta" />,
              title: "লেনদেন ও নির্ভরযোগ্য আড্ডা (Easy Banking)",
              desc: "একই স্থানে দ্রুত ও নিরাপদ বিকাশ ও নগদ লেনদেনের পাশাপাশি আপনার আড্ডাকে চমৎকার ও প্রাণবন্ত করতে আমরা সবসময় প্রতিজ্ঞাবদ্ধ।"
            }
          ].map((val, idx) => (
            <div key={idx} className="space-y-4 max-w-sm mx-auto">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-coffee-100 text-coffee-800 flex items-center justify-center shadow-inner">
                {val.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-coffee-950">{val.title}</h3>
              <p className="text-sm text-coffee-800/70 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
