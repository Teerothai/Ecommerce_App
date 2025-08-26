import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import PersonalInfoPage from './components/PersonalInfoPage';
import ContractPage from './components/ContractPage';
import CategoriesPage from './components/CategoriesPage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-peach-200">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/personal-info" element={<PersonalInfoPage />} />
            <Route path="/contract" element={<ContractPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;