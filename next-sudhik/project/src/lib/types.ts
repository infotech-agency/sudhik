// ---- Types matching the backend API responses ----

export interface ProductImage {
  url: string;
  publicId?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Product {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  stock: number;
  images: string[] | ProductImage[];
  benefits: string;
  ingredients: string;
  howToUse: string;
  specifications: string;
  shippingInfo: string;
  productInformation: string;
  faqs: Faq[];
  category?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  guestName?: string;
  user?: { _id: string; name: string } | null;
  createdAt: string;
}

export interface Blog {
  _id: string;
  slug?: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  author?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
    landmark?: string; 
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'COD' | 'ONLINE';

export interface OrderProduct {
  _id: string;
  title: string;
  images: string[] | ProductImage[];
}


export interface OrderLineItem {
  product: OrderProduct | string; // populate hone par object, warna sirf id
  name: string;
  quantity: number;
  price: number;
}


export interface OrderItem {
  productId: string;
  quantity: number;
}

// export interface OrderResponse {
//   _id: string;
//   status: string;
//   paymentUrl?: string;
//    authToken?: string | null;
//   merchantTransactionId?: string;
// }

export interface OrderResponse {
  _id: string;
  status: string;
  paymentUrl?: string;
  authToken?: string | null;
  merchantTransactionId?: string;
}

export interface ReviewSubmit {
  rating: number;
  comment: string;
  guestName?: string;
}

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   role?: string;
// }

// export interface User {
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string | null;
//     isGuest: boolean;
//   };
//   totalSpent: number;
//   totalOrdersPaid: number;
//   codOrders: number;
// }
// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string | null;
//   role: string;
//   isGuest: boolean;
//   authProvider?: string;
//   totalSpent: number;
//   totalOrdersPaid: number;
//   codOrders: number;
// }

export interface UserAddress {
  _id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isGuest: boolean;
  authProvider?: string;
  avatar?: string | null;
  totalSpent: number;
  totalOrders: number;
  addresses?: UserAddress[];
}