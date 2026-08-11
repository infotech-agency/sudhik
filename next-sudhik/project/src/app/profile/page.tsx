'use client';

import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import type { Order, OrderProduct, UserAddress } from '@/lib/types';
import {
  Package,
  MapPin,
  Phone,
  Mail,
  Receipt,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Check,
  LogOut,
  X,
  PlusCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

function getImageUrl(images: OrderProduct['images']): string | null {
  if (!images || images.length === 0) return null;
  const first = images[0];
  return typeof first === 'string' ? first : first.url;
}

const STATUS_STYLES: Record<string, string> = {
  Processing: 'bg-gold-50 text-saffron-600 border-gold-400/30',
  Shipped: 'bg-blue-50 text-blue-600 border-blue-200',
  Delivered: 'bg-green-50 text-green-700 border-green-200',
  Cancelled: 'bg-maroon-50 text-maroon-500 border-maroon-500/20',
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || 'bg-gold-50 text-ink/60 border-gold-400/20';
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-royal tracking-royal-sm uppercase border ${style}`}>
      {status}
    </span>
  );
}

interface AddressFormState {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const initialFormState: AddressFormState = {
  name: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
};

export default function ProfilePage() {
  const { user, loading, logout, refresh } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');

  // Address-related states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [formState, setFormState] = useState<AddressFormState>(initialFormState);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // tracks IDs of mutating addresses

  useEffect(() => {
    if (user) {
      api
        .get<Order[]>('/api/orders/me', undefined, true)
        .then(setOrders)
        .catch((err) => console.error('Error fetching orders:', err))
        .finally(() => setOrdersLoading(false));
    } else {
      setOrdersLoading(false);
    }
  }, [user]);

  // Open Form for Adding
  const handleOpenAdd = () => {
    setFormState(initialFormState);
    setEditingAddress(null);
    setFormError('');
    setShowAddressForm(true);
  };

  // Open Form for Editing
  const handleOpenEdit = (addr: UserAddress) => {
    setFormState({
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country,
    });
    setEditingAddress(addr);
    setFormError('');
    setShowAddressForm(true);
  };

  // Handle Form Submission (Add or Update)
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (
      !formState.name.trim() ||
      !formState.phone.trim() ||
      !formState.address.trim() ||
      !formState.city.trim() ||
      !formState.state.trim() ||
      !formState.pincode.trim() ||
      !formState.country.trim()
    ) {
      setFormError('Please fill in all address fields.');
      return;
    }

    if (!/^\d{10}$/.test(formState.phone.trim())) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!/^\d{6}$/.test(formState.pincode.trim())) {
      setFormError('Please enter a valid 6-digit pincode.');
      return;
    }

    setFormLoading(true);

    try {
      if (editingAddress) {
        // Update call
        await api.put(`/api/users/addresses/${editingAddress._id}`, formState, true);
      } else {
        // Create call
        await api.post('/api/users/addresses', formState, true);
      }

      // Refresh Auth Context to sync addresses
      await refresh();
      setShowAddressForm(false);
      setFormState(initialFormState);
      setEditingAddress(null);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save address. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    setActionLoading(id);

    try {
      await api.del(`/api/users/addresses/${id}`, true);
      await refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to delete address.');
    } finally {
      setActionLoading(null);
    }
  };

  // Set Default Address
  const handleSetDefault = async (id: string) => {
    setActionLoading(id);

    try {
      await api.patch(`/api/users/addresses/${id}/default`, {}, true);
      await refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to set default address.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="pt-28 sm:pt-32 min-h-screen bg-sand/30 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-28 sm:pt-32 min-h-screen bg-sand/30 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-400/25 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={26} className="text-saffron-500" />
          </div>
          <h2 className="font-display text-2xl text-ink">No Account Yet</h2>
          <p className="font-serif text-ink/55 mt-2 mb-6">
            Please checkout or sign in to view your profile, address book, and order history.
          </p>
          <Link href="/auth/login">
            <Button variant="maroon" size="sm">
              Sign In / Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="pt-24 sm:pt-28 pb-16 min-h-screen bg-sand/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* ---------- Profile Card ---------- */}
        <div className="bg-ivory rounded-3xl shadow-premium border border-gold-400/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center font-display text-2xl shadow-gold shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h1 className="font-display text-2xl text-ink truncate">{user.name}</h1>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-maroon-600/25 text-maroon-600 hover:bg-maroon-50 text-xs font-sans font-semibold transition-all shrink-0 uppercase tracking-royal-sm"
                >
                  <LogOut size={12} /> Sign Out
                </button>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                <span className="flex items-center gap-1.5 font-serif text-sm text-ink/55">
                  <Mail size={13} /> {user.email}
                </span>
                {user.phone && (
                  <span className="flex items-center gap-1.5 font-serif text-sm text-ink/55">
                    <Phone size={13} /> {user.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gold-400/15 text-center sm:text-left">
            <div>
              <p className="font-display text-3xl text-ink">₹{user?.totalSpent?.toLocaleString('en-IN')}</p>
              <p className="font-royal text-[10px] tracking-royal uppercase text-ink/45 mt-1">Total Spent</p>
            </div>
            <div className="border-l border-gold-400/15 pl-4">
              <p className="font-display text-3xl text-ink">{user?.totalOrders}</p>
              <p className="font-royal text-[10px] tracking-royal uppercase text-ink/45 mt-1">Total Orders</p>
            </div>
          </div>
        </div>

        {/* ---------- Tabs Header ---------- */}
        <div className="flex border-b border-gold-400/20">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 text-center font-display text-base border-b-2 transition-all uppercase tracking-wider ${activeTab === 'orders'
              ? 'border-saffron-500 text-saffron-600 font-semibold'
              : 'border-transparent text-ink/40 hover:text-ink/65'
              }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-4 text-center font-display text-base border-b-2 transition-all uppercase tracking-wider ${activeTab === 'addresses'
              ? 'border-saffron-500 text-saffron-600 font-semibold'
              : 'border-transparent text-ink/40 hover:text-ink/65'
              }`}
          >
            My Address Book
          </button>
        </div>

        {/* ---------- Orders Tab Content ---------- */}
        {activeTab === 'orders' && (
          <div>
            {ordersLoading && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-ivory rounded-2xl border border-gold-400/20 p-5 animate-pulse">
                    <div className="h-4 w-32 bg-gold-100 rounded mb-3" />
                    <div className="h-3 w-full bg-gold-50 rounded" />
                  </div>
                ))}
              </div>
            )}

            {!ordersLoading && orders.length === 0 && (
              <div className="bg-ivory rounded-2xl border border-gold-400/20 p-10 text-center">
                <Package size={32} className="text-ink/20 mx-auto mb-3" />
                <p className="font-serif text-ink/55">No orders yet.</p>
              </div>
            )}

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-ivory rounded-2xl shadow-sm border border-gold-400/20 overflow-hidden"
                >
                  {/* order header */}
                  <div className="flex justify-between items-start gap-3 px-5 py-4 bg-sand/40 border-b border-gold-400/15">
                    <div>
                      <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-0.5">
                        Order
                      </p>
                      <p className="font-display text-base text-ink">{order.orderNumber}</p>
                      <p className="font-serif text-xs text-ink/45 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display text-lg text-ink">₹{order.totalAmount}</p>
                      <div className="mt-1">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                  </div>

                  {/* products in this order */}
                  <div className="px-5 py-4 space-y-3">
                    {order.items.map((item, idx) => {
                      const product = typeof item.product === 'object' ? item.product : null;
                      const imageUrl = product ? getImageUrl(product.images) : null;

                      return (
                        <div key={idx} className="flex items-center gap-3">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="w-12 h-14 rounded-lg object-cover border border-gold-400/20 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-14 rounded-lg bg-gold-50 border border-gold-400/20 flex items-center justify-center shrink-0">
                              <Package size={16} className="text-ink/25" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-sm text-ink truncate">{item.name}</p>
                            <p className="font-sans text-xs text-ink/45">Qty {item.quantity}</p>
                          </div>
                          <p className="font-serif text-sm text-ink/80 shrink-0">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* per-order spend breakdown */}
                  <div className="px-5 py-4 bg-sand/30 border-t border-gold-400/15 space-y-1.5">
                    <div className="flex justify-between font-sans text-xs text-ink/50">
                      <span>Subtotal</span>
                      <span>₹{order.subtotal}</span>
                    </div>
                    {order.discountAmount > 0 && (
                      <div className="flex justify-between font-sans text-xs text-saffron-600">
                        <span>Discount</span>
                        <span>− ₹{order.discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-serif text-sm text-ink font-medium pt-1.5 border-t border-gold-400/10">
                      <span>Total Paid</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Address Book Tab Content ---------- */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-xl text-ink flex items-center gap-2">
                <MapPin size={18} className="text-saffron-500" /> Stored Addresses
              </h2>
              {!showAddressForm && (
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-ivory text-xs font-sans font-semibold rounded-full uppercase tracking-royal-sm shadow-gold hover:shadow-glow transition-all"
                >
                  <PlusCircle size={14} /> Add Address
                </button>
              )}
            </div>

            {/* ---------- Add/Edit Address Form ---------- */}
            {showAddressForm && (
              <div className="bg-ivory rounded-3xl border border-gold-400/35 p-6 shadow-glow-soft relative">
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gold-50 text-ink/40 hover:text-ink/65 transition-colors"
                >
                  <X size={18} />
                </button>
                <h3 className="font-royal text-lg text-ink font-semibold mb-5 uppercase tracking-wide">
                  {editingAddress ? 'Modify Address' : 'New Address Details'}
                </h3>

                {formError && (
                  <div className="mb-5 p-3.5 rounded-xl bg-maroon-950/5 border border-maroon-600/20 text-maroon-600 flex items-start gap-2.5">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span className="font-sans text-xs font-medium">{formError}</span>
                  </div>
                )}

                <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Receiver Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Arjun Dev"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Phone Number (10 digits)
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Pincode (6 digits)
                    </label>
                    <input
                      type="text"
                      value={formState.pincode}
                      onChange={(e) => setFormState({ ...formState, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="e.g. 110001"
                      maxLength={6}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Street Address
                    </label>
                    <textarea
                      value={formState.address}
                      onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                      placeholder="Flat, House no., Apartment, Street, Sector"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      placeholder="e.g. New Delhi"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formState.state}
                      onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                      placeholder="e.g. Delhi"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formState.country}
                      onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                      placeholder="India"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      disabled={formLoading}
                      className="px-5 py-2.5 rounded-full border border-gold-400/40 text-ink/65 hover:bg-gold-50 font-sans text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-maroon-500 to-maroon-600 hover:from-maroon-600 hover:to-maroon-700 text-ivory text-xs font-sans font-semibold rounded-full uppercase tracking-royal-sm shadow-gold transition-colors disabled:opacity-50"
                    >
                      {formLoading && <Loader2 size={12} className="animate-spin" />}
                      {editingAddress ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ---------- Stored Addresses List ---------- */}
            <div className="space-y-4">
              {(!user.addresses || user.addresses.length === 0) ? (
                <div className="bg-ivory rounded-2xl border border-gold-400/20 p-10 text-center">
                  <MapPin size={32} className="text-ink/15 mx-auto mb-3" />
                  <p className="font-serif text-ink/55">No addresses saved yet.</p>
                </div>
              ) : (
                user.addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className={`bg-ivory rounded-2xl border p-5 relative transition-all ${addr.isDefault
                      ? 'border-saffron-500/60 shadow-glow-soft bg-saffron-50/10'
                      : 'border-gold-400/20 shadow-sm hover:border-gold-400/40'
                      }`}
                  >
                    <div className="flex justify-between items-start gap-4 pr-12">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h4 className="font-serif text-base text-ink font-semibold">{addr.name}</h4>
                          {addr.isDefault && (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-saffron-100 text-saffron-700 text-[10px] font-sans font-bold uppercase tracking-wider">
                              <Check size={10} /> Default
                            </span>
                          )}
                        </div>
                        <p className="font-serif text-sm text-ink-soft/80 leading-relaxed max-w-lg">
                          {addr.address}, {addr.city}, {addr.state} - {addr.pincode}, {addr.country}
                        </p>
                        <p className="font-sans text-xs text-ink/45 mt-2 flex items-center gap-1.5">
                          <Phone size={12} /> {addr.phone}
                        </p>
                      </div>
                    </div>

                    {/* Address Actions */}
                    <div className="absolute right-4 top-4 flex items-center gap-1.5">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr._id)}
                          disabled={actionLoading !== null}
                          className="px-2.5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-saffron-600 hover:bg-saffron-50 border border-saffron-400/30 rounded-lg transition-colors disabled:opacity-50"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(addr)}
                        disabled={actionLoading !== null}
                        aria-label="Edit address"
                        className="p-2 rounded-lg border border-gold-400/20 hover:bg-gold-50 text-ink/50 hover:text-ink transition-colors disabled:opacity-50"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr._id)}
                        disabled={actionLoading !== null}
                        aria-label="Delete address"
                        className="p-2 rounded-lg border border-maroon-600/20 hover:bg-maroon-50 text-maroon-500 hover:text-maroon-600 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Inline loader for default/delete actions */}
                    {actionLoading === addr._id && (
                      <div className="absolute inset-0 bg-ivory/60 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                        <Loader2 size={24} className="text-saffron-500 animate-spin" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}