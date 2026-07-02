import React, { useState } from 'react';
import { Calendar, Users, Star, MessageSquare, ClipboardCheck, XCircle, ShieldCheck, Mail, Phone, Trash2, CheckCircle2 } from 'lucide-react';
import { Reservation, Feedback } from '../types';
import { TABLES } from '../data';

interface AdminViewProps {
  reservations: Reservation[];
  updateReservationStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
  deleteReservation: (id: string) => void;
  feedbackList: Feedback[];
  deleteFeedback: (id: string) => void;
}

export default function AdminView({
  reservations,
  updateReservationStatus,
  deleteReservation,
  feedbackList,
  deleteFeedback
}: AdminViewProps) {
  const [adminTab, setAdminTab] = useState<'bookings' | 'feedback'>('bookings');

  // Stats
  const totalBookings = reservations.length;
  const confirmedBookings = reservations.filter(r => r.status === 'confirmed').length;
  const averageRating = feedbackList.length > 0 
    ? (feedbackList.reduce((acc, f) => acc + f.rating, 0) / feedbackList.length).toFixed(1)
    : '5.0';

  return (
    <div id="admin-view-container" className="animate-fadeIn pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-8 border-b border-coffee-100">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-terracotta" />
            <span className="text-xs uppercase tracking-widest font-extrabold text-terracotta">Internal Staff Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-coffee-950 mt-1">Cafe Management Console</h1>
          <p className="text-xs text-coffee-800/60 mt-0.5">Manage live bookings, seating schedules, and customer feedback logs.</p>
        </div>

        {/* Toggle Panel buttons */}
        <div className="flex gap-2 bg-coffee-100/50 p-1 rounded-xl border border-coffee-100">
          <button
            onClick={() => setAdminTab('bookings')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'bookings'
                ? 'bg-coffee-800 text-white shadow-sm'
                : 'text-coffee-800 hover:bg-coffee-100'
            }`}
          >
            Reservations ({reservations.length})
          </button>
          <button
            onClick={() => setAdminTab('feedback')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'feedback'
                ? 'bg-coffee-800 text-white shadow-sm'
                : 'text-coffee-800 hover:bg-coffee-100'
            }`}
          >
            Feedback Inbox ({feedbackList.length})
          </button>
        </div>
      </div>

      {/* Metrics Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
        {[
          {
            title: "Total Table Bookings",
            value: totalBookings,
            subtitle: `${confirmedBookings} Confirmed slots`,
            icon: <Calendar className="w-5 h-5 text-terracotta" />
          },
          {
            title: "Average Customer Rating",
            value: `${averageRating} / 5.0`,
            subtitle: "Based on store reviews",
            icon: <Star className="w-5 h-5 text-amber-gold fill-amber-gold" />
          },
          {
            title: "Feedback Messages",
            value: feedbackList.length,
            subtitle: "Active guest inquiries",
            icon: <MessageSquare className="w-5 h-5 text-sky-400" />
          }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-coffee-100 p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-coffee-800/50 block">{metric.title}</span>
              <span className="text-2xl font-extrabold text-coffee-950 font-sans block">{metric.value}</span>
              <span className="text-[10px] text-coffee-800/60 block">{metric.subtitle}</span>
            </div>
            <div className="p-3 bg-coffee-50 rounded-xl">
              {metric.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Booking List Sub-panel */}
      {adminTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-coffee-100 overflow-hidden shadow-sm">
          <div className="bg-coffee-50 p-6 border-b border-coffee-100 flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-coffee-950">Seating Reservation Ledger</h3>
              <p className="text-xs text-coffee-800/60 mt-0.5">Click actions to dynamically update table hold states.</p>
            </div>
            <span className="text-xs font-semibold text-coffee-800">
              Active: {reservations.filter(r => r.status === 'pending').length} Pending
            </span>
          </div>

          {reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-coffee-50/50 text-[10px] font-bold text-coffee-800/60 uppercase tracking-widest border-b border-coffee-100">
                    <th className="p-4">Reference</th>
                    <th className="p-4">Guest Details</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Assigned Table</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ledger Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-coffee-50 text-xs">
                  {reservations.map((res) => {
                    const table = TABLES.find(t => t.id === res.tableId);
                    return (
                      <tr key={res.id} className="hover:bg-coffee-50/20 transition-colors">
                        
                        {/* Reference */}
                        <td className="p-4 font-mono font-bold text-coffee-900">
                          {res.id}
                        </td>
                        
                        {/* Guest details */}
                        <td className="p-4 space-y-1">
                          <p className="font-bold text-coffee-950 text-sm">{res.name}</p>
                          <div className="flex flex-col gap-0.5 text-[10px] text-coffee-800/70">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-terracotta" /> {res.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-terracotta" /> {res.phone}</span>
                          </div>
                          {res.specialRequest && (
                            <p className="p-2 rounded bg-coffee-50 text-[10px] italic border-l-2 border-terracotta text-coffee-800 max-w-xs mt-1">
                              "Requests: {res.specialRequest}"
                            </p>
                          )}
                        </td>

                        {/* Date Time */}
                        <td className="p-4 space-y-1">
                          <p className="font-bold text-coffee-900">{res.date}</p>
                          <p className="text-[10px] text-coffee-800/60">Arriving: {res.time}</p>
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-terracotta px-2 py-0.5 rounded bg-coffee-100 mt-1">
                            <Users className="w-3 h-3" /> {res.partySize} Guests
                          </span>
                        </td>

                        {/* Table details */}
                        <td className="p-4">
                          {table ? (
                            <div className="space-y-0.5">
                              <p className="font-bold text-coffee-900">{table.name}</p>
                              <p className="text-[10px] text-coffee-800/60 uppercase tracking-wide">
                                Type: {table.type} (Cap: {table.capacity})
                              </p>
                            </div>
                          ) : (
                            <span className="text-red-500 font-bold">Unassigned</span>
                          )}
                        </td>

                        {/* Status badge */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider shadow-inner ${
                            res.status === 'confirmed'
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : res.status === 'cancelled'
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {res.status === 'confirmed' && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                            {res.status === 'cancelled' && <XCircle className="w-3 h-3 shrink-0" />}
                            {res.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            {res.status !== 'confirmed' && (
                              <button
                                onClick={() => updateReservationStatus(res.id, 'confirmed')}
                                className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                                title="Confirm Seating Slot"
                              >
                                Approve
                              </button>
                            )}
                            {res.status !== 'cancelled' && (
                              <button
                                onClick={() => updateReservationStatus(res.id, 'cancelled')}
                                className="bg-amber-gold hover:bg-amber-800 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                                title="Cancel Seating Slot"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => deleteReservation(res.id)}
                              className="bg-transparent border border-coffee-100 text-coffee-800/40 hover:text-red-500 hover:border-red-100 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete Ledger Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-16 space-y-3">
              <p className="text-sm font-bold text-coffee-800">No Reservations Logged</p>
              <p className="text-xs text-coffee-800/60">
                When guests book tables from our Seating Map page, details will dynamically load inside this ledger.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Feedback List Sub-panel */}
      {adminTab === 'feedback' && (
        <div className="bg-white rounded-3xl border border-coffee-100 overflow-hidden shadow-sm">
          <div className="bg-coffee-50 p-6 border-b border-coffee-100 flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-coffee-950">Customer Reviews & Feedbacks</h3>
              <p className="text-xs text-coffee-800/60 mt-0.5">A history of ratings and messages submitted via the Contact Form.</p>
            </div>
            <span className="text-xs font-semibold text-coffee-800">
              Total Inbox: {feedbackList.length} reviews
            </span>
          </div>

          {feedbackList.length > 0 ? (
            <div className="divide-y divide-coffee-50 p-6 space-y-6">
              {feedbackList.map((feed) => (
                <div key={feed.id} className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-coffee-50 last:border-b-0 last:pb-0">
                  <div className="space-y-2 flex-grow pr-6">
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-coffee-900 text-sm leading-none">{feed.name}</h4>
                      <span className="text-[10px] text-coffee-800/50">|</span>
                      <span className="text-[10px] text-coffee-800/70 font-mono">{feed.email}</span>
                      <span className="text-[10px] text-coffee-800/50">|</span>
                      <span className="text-[9px] text-coffee-800/40 uppercase tracking-wider">{feed.createdAt}</span>
                    </div>

                    {/* Star list */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(feed.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-gold text-amber-gold" />
                      ))}
                      {[...Array(5 - feed.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-coffee-200" />
                      ))}
                    </div>

                    <p className="text-xs text-coffee-800/80 leading-relaxed bg-coffee-50/40 p-3 rounded-xl italic">
                      "{feed.message}"
                    </p>

                  </div>

                  {/* Right side delete action */}
                  <button
                    onClick={() => deleteFeedback(feed.id)}
                    className="p-2 border border-coffee-100 rounded-xl text-coffee-800/40 hover:text-red-500 hover:border-red-100 transition-colors self-start shrink-0 cursor-pointer"
                    title="Delete Review Log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-16 space-y-3">
              <p className="text-sm font-bold text-coffee-800">Inbox is empty</p>
              <p className="text-xs text-coffee-800/60">
                Customer reviews and messages submitted from our contact coordinates will show up here.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
