import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  phone?: string;
  email?: string;
  name?: string;
  isLoggedIn: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  installmentPlans: InstallmentPlan[];
  rating: number;
  reviews: Review[];
}

interface InstallmentPlan {
  id: string;
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface CartItem {
  product: Product;
  plan?: InstallmentPlan;
  coupon?: string;
}

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: Product[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '',
    isLoggedIn: false,
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: '1',
      name: 'Shiba Pro Max',
      price: 29999,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'flagship',
      description: 'Premium smartphone with advanced camera and performance',
      installmentPlans: [
        { id: '1', months: 6, monthlyPayment: 5166, totalAmount: 31000, interestRate: 3.3 },
        { id: '2', months: 12, monthlyPayment: 2666, totalAmount: 32000, interestRate: 6.7 },
        { id: '3', months: 24, monthlyPayment: 1416, totalAmount: 34000, interestRate: 13.3 },
      ],
      rating: 4.8,
      reviews: [
        { id: '1', userName: 'ShibaLover', rating: 5, comment: 'Amazing phone! Love the design', date: '2024-01-15' },
        { id: '2', userName: 'TechUser', rating: 4, comment: 'Great performance, good value', date: '2024-01-10' },
      ]
    },
    {
      id: '2',
      name: 'Shiba Lite',
      price: 15999,
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'budget',
      description: 'Affordable smartphone with essential features',
      installmentPlans: [
        { id: '4', months: 6, monthlyPayment: 2766, totalAmount: 16600, interestRate: 3.8 },
        { id: '5', months: 12, monthlyPayment: 1433, totalAmount: 17200, interestRate: 7.5 },
      ],
      rating: 4.3,
      reviews: [
        { id: '3', userName: 'BudgetBuyer', rating: 4, comment: 'Great value for money', date: '2024-01-12' },
      ]
    },
    {
      id: '3',
      name: 'Shiba Gaming',
      price: 35999,
      image: 'https://images.pexels.com/photos/163065/mobile-phone-android-apps-phone-163065.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'gaming',
      description: 'High-performance gaming smartphone',
      installmentPlans: [
        { id: '6', months: 12, monthlyPayment: 3199, totalAmount: 38400, interestRate: 6.7 },
        { id: '7', months: 24, monthlyPayment: 1699, totalAmount: 40800, interestRate: 13.3 },
      ],
      rating: 4.9,
      reviews: [
        { id: '4', userName: 'GamerPro', rating: 5, comment: 'Perfect for gaming!', date: '2024-01-08' },
      ]
    },
  ];

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        products,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}