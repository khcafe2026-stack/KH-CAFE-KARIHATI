import { MenuItem, Table, TeamMember, FAQItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'c1',
    name: 'দুধ চা / Milk Tea',
    description: 'আমাদের বিশেষ চা-মেশিনে তৈরি ঘন ও সুস্বাদু ঐতিহ্যবাহী দুধ চা।',
    price: 10,
    category: 'coffee',
    tags: ['Hot', 'Classic', 'Popular'],
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600',
    customizable: true
  },
  {
    id: 'c2',
    name: 'কফি / Coffee',
    description: 'মেশিনে তৈরি চমৎকার ঘ্রাণ ও স্বাদের গরম কফি।',
    price: 15,
    category: 'coffee',
    tags: ['Hot', 'Popular'],
    image: '/src/assets/images/menu_latte_art_1782466899530.jpg',
    customizable: true
  },
  {
    id: 'c3',
    name: 'রং চা / Black Tea',
    description: 'লেবু, আদা ও মসলা দিয়ে তৈরি স্বাস্থ্যকর ও সতেজকারী গরম রং চা।',
    price: 10,
    category: 'coffee',
    tags: ['Hot', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1485808191679-5f63773ee15c?auto=format&fit=crop&q=80&w=600',
    customizable: false
  },
  {
    id: 't1',
    name: 'কমলা জুস / Orange Juice',
    description: 'তাজা ও খাঁটি কমলার রস দিয়ে তৈরি অত্যন্ত রিফ্রেশিং ঠান্ডা জুস।',
    price: 65,
    category: 'tea',
    tags: ['Iced', 'Fresh', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600',
    customizable: false
  },
  {
    id: 'b1',
    name: 'স্পেশাল মিক্স কম্বো / Special Mix Combo',
    description: 'হাতে তৈরি গরম ২ পিস রুটি, ১টি ডিমের অমলেট, ১টি তাজা পাকা কলা এবং এক কাপ গরম দুধ চা।',
    price: 50,
    category: 'breakfast',
    tags: ['Snack', 'Heavy Snack', 'Staff Pick'],
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600',
    customizable: false
  }
];

export const TABLES: Table[] = [
  { id: 't-1', name: 'ওয়াল টেবিল এ (Wall Table A)', capacity: 3, x: 25, y: 35, type: 'window' },
  { id: 't-2', name: 'ওয়াল টেবিল বি (Wall Table B)', capacity: 3, x: 50, y: 35, type: 'window' },
  { id: 't-3', name: 'ওয়াল টেবিল সি (Wall Table C)', capacity: 3, x: 75, y: 35, type: 'window' }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'm1',
    name: 'AH Nilay',
    role: 'Founder',
    fact: 'কারিহাটিতে একটি সুন্দর ও সৃজনশীল আড্ডার জায়গা গড়ে তোলার মূল স্বপ্নদ্রষ্টা।',
    image: 'https://drive.google.com/file/d/1cEHkHZR5L87EGdfBoMBelti9FCX9aSVZ/view?usp=drive_link'
  },
  {
    id: 'm2',
    name: 'MH Fahim',
    role: 'Managing Partner',
    fact: 'নিষ্ঠা ও কঠোর পরিশ্রমের মাধ্যমে কারিহাটি ক্যাফের স্বপ্নকে বাস্তবে রূপদানকারী।',
    image: 'https://drive.google.com/file/d/1tYu-y0YKyzYWTAQwRkbXtDiVMwr48I1y/view?usp=drive_link'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'আপনাদের ক্যাফেতে কি বিকাশ এবং নগদ সার্ভিস আছে?',
    answer: 'হ্যাঁ! কারিহাটি ক্যাফেতে আপনি অতি দ্রুত ও নিরাপদে বিকাশ (bKash) এবং নগদ (Nagad) এর পার্সোনাল ক্যাশ-ইন ও ক্যাশ-আউট সেবা গ্রহণ করতে পারবেন। কাউন্টারেই আমাদের সার্ভিস ডেস্ক রয়েছে।',
    category: 'সেবাসমূহ'
  },
  {
    question: 'ডেলিভারি বা অর্ডার কিভাবে করব?',
    answer: 'আমাদের ওয়েবসাইট থেকে আপনার পছন্দের চা, কফি বা স্ন্যাক্স সিলেক্ট করে "Send Order to WhatsApp" এ ক্লিক করলেই অর্ডার ডিটেইলস আমাদের হোয়াটসঅ্যাপে (+8801355016567) চলে যাবে। আমরা সাথে সাথে তা প্রস্তুত রাখব!',
    category: 'অর্ডার'
  },
  {
    question: 'আপনাদের খোলা রাখার সময়সূচী কি?',
    answer: 'কারিহাটি ক্যাফে প্রতিদিন সকাল ৮:৩০ টা থেকে দুপুর ১:৩০ টা পর্যন্ত খোলা থাকে, এরপর দুপুর ১:৩০ টা থেকে বিকেল ৩:০০ টা পর্যন্ত বিরতি থাকে, এবং বিকেল ৩:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত পুনরায় খোলা থাকে।',
    category: 'সময়সূচী'
  },
  {
    question: 'আপনাদের ক্যাফেটি ঠিক কোথায় অবস্থিত?',
    answer: 'আমরা নোয়াখালীর সোনাইমুড়ীর ঐতিহ্যবাহী কারিহাটি বাজারে (3877 Sonaimuri, karihati Rd noakhali, 3877, Bangladesh) অবস্থিত। আপনি গুগল ম্যাপে "KARIHATI CAFE" সার্চ করলেই আমাদের লোকেশন পেয়ে যাবেন।',
    category: 'অবস্থান'
  },
  {
    question: 'ক্যাফেতে কি আড্ডা বা বসার জায়গা আছে?',
    answer: 'হ্যাঁ, আমাদের অত্যন্ত সুন্দর, পরিচ্ছন্ন এবং নিরিবিলি পারিবারিক পরিবেশ রয়েছে যেখানে আপনি আরামদায়ক সোফা, চেয়ার বা বার স্টুলে বসে আড্ডা দিতে পারবেন অথবা কাজ করতে পারবেন।',
    category: 'পরিবেশ'
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'g1',
    category: 'Interior',
    title: 'Warm Rustic Corner',
    image: '/src/assets/images/cafe_hero_1782466885010.jpg'
  },
  {
    id: 'g2',
    category: 'Drinks',
    title: 'Signature Latte Art',
    image: '/src/assets/images/menu_latte_art_1782466899530.jpg'
  },
  {
    id: 'g3',
    category: 'Interior',
    title: 'Minimalist Workspace Bar',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g4',
    category: 'Food',
    title: 'Artisanal Sourdough Avocado Toast',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g5',
    category: 'Drinks',
    title: 'Nitrogen Cold Brew Prep',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g6',
    category: 'Food',
    title: 'Freshly Baked Pastries Tray',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g7',
    category: 'Events',
    title: 'Live Acoustic Weekend',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g8',
    category: 'Interior',
    title: 'Lush Botanical Patio',
    image: 'https://images.unsplash.com/photo-150133947302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS = [
  {
    id: 'r1',
    name: 'তারেক রহমান',
    rating: 5,
    comment: 'কারিহাটিতে এত সুন্দর ছিমছাম এবং শান্ত পরিবেশের ক্যাফে সত্যিই প্রশংসনীয়। তাদের মিল্ক টি এবং ডিম টোস্টের স্বাদ অসাধারণ!',
    role: 'স্থানীয় বাসিন্দা ও চাকুরিজীবী'
  },
  {
    id: 'r2',
    name: 'সাদিয়া তাসনিম',
    rating: 5,
    comment: 'মেশিন কফিটা দারুণ লেগেছে, আর ড্রাই কেকগুলো একদম ফ্রেশ থাকে। বিকাশ-নগদ সার্ভিস এক জায়গাতেই থাকায় অনেক সুবিধা হয়।',
    role: 'রিমোট গ্রাফিক ডিজাইনার'
  },
  {
    id: 'r3',
    name: 'ইমরান খান',
    rating: 5,
    comment: 'বন্ধুদের সাথে আড্ডা দেওয়ার জন্য কারিহাটি বাজারের সেরা স্পট। সার্ভিস যেমন ফাস্ট, আচরণও খুব অমায়িক!',
    role: 'বিশ্ববিদ্যালয় শিক্ষার্থী'
  }
];
