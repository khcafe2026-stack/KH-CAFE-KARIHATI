import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import MenuView from './components/MenuView';
import GalleryView from './components/GalleryView';
import ReservationsView from './components/ReservationsView';
import ContactView from './components/ContactView';
import FAQView from './components/FAQView';
import AdminView from './components/AdminView';

import { TabId, CartItem, MenuItem, Reservation, Feedback } from './types';

// Mock initial seeds if local storage is empty
const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'KH-BK-3829',
    name: 'তারেক রহমান (Tarek)',
    email: 'tarek.rahman@gmail.com',
    phone: '+880 1712-345678',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    time: '12:00',
    partySize: 2,
    specialRequest: 'উইন্ডো সিটের টেবিলটি রাখবেন প্লিজ, জন্মদিন উদযাপন করব!',
    tableId: 't-1',
    status: 'confirmed',
    createdAt: new Date().toLocaleString()
  },
  {
    id: 'KH-BK-9182',
    name: 'সাদিয়া তাসনিম (Sadia)',
    email: 'sadia.tasnim@outlook.com',
    phone: '+880 1819-987654',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '10:00',
    partySize: 1,
    specialRequest: 'ল্যাপটপ চার্জ দেওয়ার জন্য সকেটের পাশে সিট হলে ভালো হয়।',
    tableId: 't-6',
    status: 'pending',
    createdAt: new Date().toLocaleString()
  }
];

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    id: 'F-8291',
    name: 'তারেক রহমান',
    email: 'tarek.rahman@gmail.com',
    message: 'তাদের মিল্ক টি-এর স্বাদ জাস্ট অসাধারণ! পরিচ্ছন্ন পরিবেশ এবং চমৎকার ব্যবহার।',
    rating: 5,
    createdAt: '25/06/2026, 14:35:10'
  },
  {
    id: 'F-9128',
    name: 'সাদিয়া তাসনিম',
    email: 'sadia.tasnim@outlook.com',
    message: 'এখানে বসে নিরিবিলিতে কাজ করা যায়, ওয়াইফাই বেশ ফাস্ট এবং ড্রাই কেকগুলো দারুণ ক্রিস্পি!',
    rating: 5,
    createdAt: '25/06/2026, 17:12:05'
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [cartOpen, setCartOpen] = useState(false);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kh_cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reservations State (stored in localStorage)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('kh_cafe_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  // Feedback State (stored in localStorage)
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(() => {
    try {
      const saved = localStorage.getItem('kh_cafe_feedbacks');
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
    } catch {
      return INITIAL_FEEDBACKS;
    }
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('kh_cafe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kh_cafe_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('kh_cafe_feedbacks', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, quantity: number, customizations: any) => {
    const custKey = JSON.stringify(customizations);
    const itemPrice = calculateUnitPrice(item, customizations);

    setCart((prevCart) => {
      // Look for identical item with identical customizations
      const existingIdx = prevCart.findIndex(
        (cItem) => 
          cItem.menuItem.id === item.id && 
          JSON.stringify(cItem.customizations) === custKey
      );

      if (existingIdx !== -1) {
        // Increment quantity
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        // Create new item entry
        const newCartItem: CartItem = {
          id: `${item.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          menuItem: item,
          customizations,
          quantity,
          price: itemPrice
        };
        return [...prevCart, newCartItem];
      }
    });

    // Auto trigger cart sidebar to let them know it has been added successfully
    setCartOpen(true);
  };

  const calculateUnitPrice = (item: MenuItem, customizations: any) => {
    let base = item.price;
    if (customizations.size === 'Large') base += 10;
    if (customizations.milk === 'Oat' || customizations.milk === 'Almond') base += 15;
    
    if (customizations.extra) {
       customizations.extra.forEach((extra: string) => {
        if (extra === 'Extra Shot') base += 20;
        if (extra === 'Whipped Cream') base += 15;
        if (extra === 'Vanilla Syrup') base += 10;
      });
    }
    return base;
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const handleUpdateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart(prev => 
      prev.map(item => item.id === cartItemId ? { ...item, quantity } : item)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Reservation Handlers
  const handleAddReservation = (bookingDetails: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `KH-BK-${randomSuffix}`;
    
    const newReservation: Reservation = {
      ...bookingDetails,
      id: referenceId,
      status: 'pending',
      createdAt: new Date().toLocaleString()
    };

    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const handleUpdateReservationStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setReservations(prev => 
      prev.map(res => res.id === id ? { ...res, status } : res)
    );
  };

  const handleDeleteReservation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this reservation record?')) {
      setReservations(prev => prev.filter(res => res.id !== id));
    }
  };

  // Feedback Handlers
  const handleAddFeedback = (feedDetails: Omit<Feedback, 'id' | 'createdAt'>) => {
    const newFeed: Feedback = {
      ...feedDetails,
      id: `F-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString()
    };
    setFeedbackList(prev => [newFeed, ...prev]);
  };

  const handleDeleteFeedback = (id: string) => {
    if (window.confirm('Are you sure you want to delete this feedback log?')) {
      setFeedbackList(prev => prev.filter(feed => feed.id !== id));
    }
  };

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen bg-cafe-bg text-charcoal">
      
      {/* Dynamic Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main View Display Portals */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView setActiveTab={setActiveTab} />
        )}
        {activeTab === 'about' && (
          <AboutView />
        )}
        {activeTab === 'menu' && (
          <MenuView 
            cart={cart}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            updateCartQuantity={handleUpdateCartQuantity}
            clearCart={handleClearCart}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />
        )}
        {activeTab === 'gallery' && (
          <GalleryView />
        )}
        {activeTab === 'reservations' && (
          <ReservationsView onAddReservation={handleAddReservation} />
        )}
        {activeTab === 'contact' && (
          <ContactView onAddFeedback={handleAddFeedback} />
        )}
        {activeTab === 'faq' && (
          <FAQView setActiveTab={setActiveTab} />
        )}
        {activeTab === 'admin' && (
          <AdminView 
            reservations={reservations}
            updateReservationStatus={handleUpdateReservationStatus}
            deleteReservation={handleDeleteReservation}
            feedbackList={feedbackList}
            deleteFeedback={handleDeleteFeedback}
          />
        )}
      </main>

      {/* Dynamic Page Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
