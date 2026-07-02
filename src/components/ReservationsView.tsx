import React, { useState, useMemo } from 'react';
import { Calendar, Users, Clock, ShieldCheck, ClipboardCheck, CornerDownRight, Landmark, Flower, LayoutGrid, Heart } from 'lucide-react';
import { Table, Reservation } from '../types';
import { TABLES } from '../data';

interface ReservationsViewProps {
  onAddReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
}

export default function ReservationsView({ onAddReservation }: ReservationsViewProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [partySize, setPartySize] = useState<number>(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedTableId, setSelectedTableId] = useState<string>('');

  // Finished Ticket Receipt
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Suggested tables filter based on party size capacity
  const suitableTables = useMemo(() => {
    return TABLES.filter(table => table.capacity >= partySize);
  }, [partySize]);

  // Handle table click on visual map
  const handleTableSelect = (tableId: string, capacity: number) => {
    if (partySize > capacity) {
      alert(`⚠️ This table only accommodates up to ${capacity} guests. Please select a larger table or decrease your party size.`);
      return;
    }
    setSelectedTableId(tableId);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTableId) {
      alert('⚠️ Please select a table on the Seating Map before submitting.');
      return;
    }
    if (!name || !email || !phone || !date || !time) {
      alert('⚠️ Please complete all required booking form fields.');
      return;
    }

    const newRes = onAddReservation({
      name,
      email,
      phone,
      date,
      time,
      partySize,
      specialRequest,
      tableId: selectedTableId
    });

    setConfirmedReservation(newRes);

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('10:00');
    setPartySize(2);
    setSpecialRequest('');
    setSelectedTableId('');
  };

  const selectedTableDetails = useMemo(() => {
    return TABLES.find(t => t.id === selectedTableId);
  }, [selectedTableId]);

  return (
    <div id="reservations-view-container" className="animate-fadeIn pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {confirmedReservation ? (
        /* ================= TICKET CONFIRMATION VIEW ================= */
        <div className="max-w-xl mx-auto py-10 animate-fadeIn">
          <div className="bg-white rounded-3xl border-2 border-coffee-100 overflow-hidden shadow-xl relative">
            
            {/* Top decorative receipt cutouts */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-terracotta via-amber-gold to-terracotta" />
            
            {/* Ticket header */}
            <div className="p-8 text-center bg-coffee-50 border-b border-coffee-100/50 space-y-3">
              <div className="w-16 h-16 rounded-full bg-coffee-800 text-white flex items-center justify-center mx-auto shadow-md">
                <ClipboardCheck className="w-8 h-8 text-terracotta" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-terracotta">Booking Transmitted</span>
                <h2 className="font-serif text-2xl font-bold text-coffee-950 mt-1">Table Secured!</h2>
                <p className="text-xs text-coffee-800/60 mt-1">An automated confirmation copy is sent to your email.</p>
              </div>
            </div>

            {/* Ticket details body */}
            <div className="p-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-coffee-800/50 block">Reservation Reference</span>
                  <span className="font-mono font-bold text-coffee-900 text-base">{confirmedReservation.id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-coffee-800/50 block">Assigned Table</span>
                  <span className="font-serif font-bold text-coffee-900 text-base">
                    {TABLES.find(t => t.id === confirmedReservation.tableId)?.name || 'Table'}
                  </span>
                </div>
              </div>

              <div className="border-t border-dashed border-coffee-200 pt-4 space-y-3 text-sm">
                <div className="flex justify-between items-center text-coffee-800">
                  <span className="flex items-center gap-2 text-xs"><Users className="w-4 h-4 text-terracotta" /> Party Size:</span>
                  <span className="font-bold">{confirmedReservation.partySize} Guests</span>
                </div>
                <div className="flex justify-between items-center text-coffee-800">
                  <span className="flex items-center gap-2 text-xs"><Calendar className="w-4 h-4 text-terracotta" /> Booking Date:</span>
                  <span className="font-bold">{confirmedReservation.date}</span>
                </div>
                <div className="flex justify-between items-center text-coffee-800">
                  <span className="flex items-center gap-2 text-xs"><Clock className="w-4 h-4 text-terracotta" /> Arrival Time:</span>
                  <span className="font-bold">{confirmedReservation.time}</span>
                </div>
              </div>

              <div className="border-t border-coffee-100 pt-4 space-y-2 text-xs text-coffee-800/70 leading-relaxed">
                <p>🙋‍♂️ *Host Name:* {confirmedReservation.name}</p>
                <p>📞 *Contact Phone:* {confirmedReservation.phone}</p>
                {confirmedReservation.specialRequest && (
                  <p className="p-3 bg-coffee-50 rounded-lg italic">
                    "Special Request: {confirmedReservation.specialRequest}"
                  </p>
                )}
              </div>

              <div className="p-4 bg-terracotta/10 border border-terracotta/20 rounded-2xl text-center space-y-1">
                <p className="text-xs font-bold text-terracotta">💡 Guest Hold Policy</p>
                <p className="text-[10px] text-coffee-800/80 leading-normal">
                  We hold reservations for up to 15 minutes. If running late, please call +8801355016567.
                </p>
              </div>

            </div>

            {/* Ticket footer */}
            <div className="p-6 bg-cafe-bg border-t border-coffee-100 flex justify-center">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="bg-coffee-700 hover:bg-coffee-800 text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest shadow transition-colors cursor-pointer"
              >
                Book Another Table
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* ================= BOOKING FORM & INTERACTIVE SEATING MAP ================= */
        <div className="space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 py-8">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-terracotta">Live Space Management</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-coffee-950">Reserve Your Spot</h1>
            <p className="text-sm text-coffee-800/70">
              Pick your exact seat in our room. Click on a table from our live 2D seating map below, complete the form, and instantly secure your booking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Seating Map Canvas */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-coffee-100 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-coffee-950">Visual Seating Map</h3>
                  <p className="text-xs text-coffee-800/60 mt-0.5">Click directly on any table node to lock in your choice.</p>
                </div>
                
                {/* Legend indicators */}
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-coffee-100 border border-coffee-200 block" />
                    <span className="text-coffee-800/70">Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-terracotta ring-4 ring-terracotta/25 block" />
                    <span className="text-coffee-900 font-bold">Your Selected</span>
                  </div>
                </div>
              </div>

              {/* 2D Cafe Room Layout Map */}
              <div className="aspect-[4/3] bg-coffee-50 rounded-2xl relative border border-coffee-100/50 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                
                {/* Visual room annotations */}
                <div className="absolute top-0 inset-x-0 h-8 bg-coffee-900 text-white/90 text-[10px] uppercase tracking-widest flex items-center justify-center font-bold">
                  🌿 Botanical Window Side (Sunlight) 🌿
                </div>

                {/* Left Side Wall Door */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-14 bg-coffee-700 rounded-r flex items-center justify-center text-[8px] text-white font-mono writing-mode-vertical uppercase tracking-wider">
                  Main Door
                </div>

                {/* Bar counter in the center */}
                <div className="absolute top-[48%] left-[40%] w-[30%] h-12 bg-white rounded-xl border border-coffee-200/80 shadow flex items-center justify-center flex-col z-10 p-1 text-center">
                  <div className="text-[10px] font-extrabold text-coffee-900 flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    <span>Espresso Bar Barista</span>
                  </div>
                  <span className="text-[8px] text-coffee-800/50">La Marzocco Linea PB</span>
                </div>

                {/* Room decorative plants */}
                <div className="absolute bottom-6 left-6 p-2 rounded-full bg-green-100 border border-green-200 text-green-700 flex items-center justify-center" title="Aesthetic Fig Tree">
                  <Flower className="w-5 h-5 animate-pulse" />
                </div>
                <div className="absolute top-12 right-6 p-2 rounded-full bg-green-100 border border-green-200 text-green-700 flex items-center justify-center" title="Monstera Deliciosa">
                  <Flower className="w-5 h-5" />
                </div>

                {/* Dynamic Table Buttons */}
                {TABLES.map((table) => {
                  const isSelected = selectedTableId === table.id;
                  const isRecommended = table.capacity >= partySize;
                  
                  return (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() => handleTableSelect(table.id, table.capacity)}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow cursor-pointer ${
                        isSelected
                          ? 'bg-terracotta text-white ring-8 ring-terracotta/25 scale-110 z-20 border border-terracotta-hover'
                          : isRecommended
                            ? 'bg-white text-coffee-900 border border-coffee-200/80 hover:border-terracotta hover:scale-105 hover:shadow-md'
                            : 'bg-coffee-100 text-coffee-800/40 border border-coffee-200/30 opacity-40 cursor-not-allowed'
                      }`}
                      title={`${table.name} (Capacity: ${table.capacity} guests)`}
                    >
                      {table.type === 'window' && <LayoutGrid className="w-4 h-4 mb-1 text-sky-400" />}
                      {table.type === 'booth' && <Users className="w-4 h-4 mb-1 text-orange-400" />}
                      {table.type === 'bar' && <Clock className="w-4 h-4 mb-1 text-emerald-400" />}
                      {table.type === 'standard' && <Users className="w-4 h-4 mb-1 text-slate-400" />}
                      
                      <span className="text-[10px] font-bold leading-none">{table.name}</span>
                      <span className="text-[8px] opacity-75 mt-0.5 font-sans">Cap: {table.capacity}</span>
                    </button>
                  );
                })}

                {/* Bottom kitchen partition */}
                <div className="absolute bottom-0 inset-x-0 h-6 bg-coffee-100 text-coffee-800/40 text-[8px] uppercase tracking-wider flex items-center justify-center border-t border-coffee-200/50">
                  🍽️ Kitchen & Baking Hearth Area
                </div>

              </div>

              {/* Instructions summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-coffee-50 text-coffee-800">
                <div className="p-3.5 bg-coffee-50 rounded-xl space-y-1">
                  <span className="font-bold text-coffee-900 block">⚡ Sizing Recommendation</span>
                  <span>We suggest choosing tables highlighted as active for {partySize} guests. Dimmed tables accommodate fewer guests than requested.</span>
                </div>
                <div className="p-3.5 bg-coffee-50 rounded-xl space-y-1">
                  <span className="font-bold text-coffee-900 block">✨ Special Event?</span>
                  <span>Need a custom cluster for a party of 8 or more? Please use our contact form or email our private event desks.</span>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Booking Form */}
            <div className="lg:col-span-5">
              <form 
                onSubmit={handleBookingSubmit}
                className="bg-white rounded-3xl border border-coffee-100 p-6 sm:p-8 shadow-sm space-y-5"
              >
                <div className="border-b border-coffee-50 pb-4">
                  <h3 className="font-serif text-lg font-bold text-coffee-950">Table Secure Form</h3>
                  <p className="text-xs text-coffee-800/60 mt-0.5">Ensure your data matches precisely for receipt tracking.</p>
                </div>

                {/* Party Size Slider / selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-coffee-900 flex justify-between">
                    <span>Number of Guests:</span>
                    <span className="text-terracotta font-extrabold">{partySize} people</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={partySize}
                    onChange={(e) => {
                      setPartySize(parseInt(e.target.value));
                      setSelectedTableId(''); // reset selection on size change
                    }}
                    className="w-full accent-terracotta bg-coffee-50 rounded-lg h-2"
                  />
                  <div className="flex justify-between text-[10px] text-coffee-800/40 font-bold">
                    <span>1 Person</span>
                    <span>2 People</span>
                    <span>3 People (Max Seating)</span>
                  </div>
                </div>

                {/* Custom Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-coffee-800 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Kenji Harasawa"
                      className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-coffee-800 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kenji@email.com"
                        className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-coffee-800 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +8801355016567"
                        className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-coffee-800 block mb-1">Select Date *</label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-coffee-800 block mb-1">Arrival Time *</label>
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                      >
                        <option value="08:00">08:00 AM</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM (Noon)</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-coffee-800 block mb-1">Dietary/Special Requests</label>
                    <textarea
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Need highchair, celebrating birthday, vegan menu sheets..."
                      rows={2}
                      className="w-full bg-coffee-50 border border-coffee-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-terracotta text-coffee-900"
                    />
                  </div>
                </div>

                {/* Selected Table Card Indicator */}
                {selectedTableDetails ? (
                  <div className="p-4 bg-coffee-50 border border-terracotta/30 rounded-2xl flex items-center gap-3 animate-fadeIn">
                    <div className="p-2 bg-terracotta text-white rounded-xl shrink-0">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-coffee-800/50 uppercase font-bold block">Chosen Table Spot</span>
                      <p className="text-xs font-bold text-coffee-900">
                        {selectedTableDetails.name} ({selectedTableDetails.type.toUpperCase()})
                      </p>
                      <span className="text-[9px] text-terracotta font-semibold">Suitable for up to {selectedTableDetails.capacity} people</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-gold/10 border border-amber-gold/30 rounded-2xl text-center">
                    <span className="text-[10px] text-amber-gold font-bold uppercase tracking-wider block">⚠️ No Table Selected</span>
                    <span className="text-[9px] text-coffee-800/70">Please click on an active table node in the 2D visual Seating Map first.</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!selectedTableId}
                  className="w-full bg-terracotta hover:bg-terracotta-hover disabled:bg-coffee-800/30 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow hover:shadow-md cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transmit Table Reservation</span>
                </button>

              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
