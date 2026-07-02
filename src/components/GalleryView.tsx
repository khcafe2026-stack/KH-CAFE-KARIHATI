import React, { useState, useMemo } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

export default function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['all', 'Interior', 'Food', 'Drinks', 'Events'];

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenLightbox = (imgId: string) => {
    const idx = GALLERY_IMAGES.findIndex(img => img.id === imgId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const nextIdx = (lightboxIndex + 1) % GALLERY_IMAGES.length;
      setLightboxIndex(nextIdx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const prevIdx = (lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      setLightboxIndex(prevIdx);
    }
  };

  return (
    <div id="gallery-view-container" className="animate-fadeIn pb-16">
      
      {/* 1. Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4 py-12 px-4">
        <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-terracotta">Aesthetic Vibe & Design</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-coffee-950">Ambience & Craft</h1>
        <p className="text-sm text-coffee-800/70">
          Step inside our cozy corners, watch our baristas pull rich espresso, and view the artisanal dishes baked in our hearth.
        </p>
      </section>

      {/* 2. Horizontal Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-center">
        <div className="flex flex-wrap gap-2 justify-center bg-white border border-coffee-100 p-2 rounded-2xl shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-coffee-800 text-white shadow'
                  : 'bg-transparent text-coffee-800 hover:bg-coffee-50'
              }`}
            >
              {cat === 'all' ? 'View All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Grid of Images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item.id)}
              className="bg-white rounded-2xl border border-coffee-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer relative aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-coffee-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-terracotta text-white px-2.5 py-1 rounded-full self-start shadow">
                  {item.category}
                </span>
                
                <div className="space-y-1 text-white">
                  <h4 className="font-serif font-bold text-sm leading-tight">{item.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-coffee-100/80">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Expand view</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Instagram CTA Block */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-cafe-bg text-coffee-950 rounded-3xl p-8 sm:p-12 text-center border border-coffee-100 relative overflow-hidden shadow-sm">
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-terracotta/5 rounded-full blur-2xl" />
          <div className="relative z-10 space-y-4">
            <div className="p-3 bg-terracotta/10 text-terracotta rounded-2xl inline-block">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-coffee-950">Show Us Your Ritual</h3>
            <p className="text-sm text-coffee-800/80 max-w-md mx-auto leading-relaxed">
              We love seeing your study sessions, latte art captures, and sourdough snapshots. Share on socials using <span className="text-terracotta font-bold">#KHCAFE</span> for featured rewards!
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-coffee-800 hover:bg-coffee-900 text-white font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Follow @khcafe</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIGHTBOX OVERLAY */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-coffee-950/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 animate-fadeIn select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header row */}
          <div className="flex justify-between items-center text-white p-4">
            <div>
              <span className="text-xs text-terracotta font-bold uppercase tracking-widest">
                {GALLERY_IMAGES[lightboxIndex].category}
              </span>
              <h3 className="font-serif font-bold text-lg">
                {GALLERY_IMAGES[lightboxIndex].title}
              </h3>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Core image display */}
          <div className="relative flex-grow flex items-center justify-center max-h-[75vh]">
            
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-white/5 text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Central Image container */}
            <div 
              className="max-w-[90%] max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightboxIndex].image}
                alt={GALLERY_IMAGES[lightboxIndex].title}
                className="object-contain max-h-[65vh] mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-white/5 text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Footer Metadata Indicator */}
          <div className="text-center text-coffee-100/50 text-xs py-4">
            Image {lightboxIndex + 1} of {GALLERY_IMAGES.length}
          </div>

        </div>
      )}

    </div>
  );
}
