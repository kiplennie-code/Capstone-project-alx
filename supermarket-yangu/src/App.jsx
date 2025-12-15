// App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import POS from './pages/POS';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Reports from './pages/Reports';

export default function App() {
  const [cart, setCart] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [inventory, setInventory] = useState({});

  // Initialize inventory from FakeStore products
  const initializeInventory = (products) => {
    const inv = {};
    products.forEach(product => {
      if (!inventory[product.id]) {
        inv[product.id] = Math.floor(Math.random() * 50) + 20; // Random stock 20-70
      }
    });
    setInventory(prev => ({ ...prev, ...inv }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/pos" 
            element={
              <POS 
                cart={cart}
                setCart={setCart}
                inventory={inventory}
                setInventory={setInventory}
                setSalesHistory={setSalesHistory}
                salesHistory={salesHistory}
                initializeInventory={initializeInventory}
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <Products 
                inventory={inventory}
                initializeInventory={initializeInventory}
              />
            } 
          />
          <Route 
            path="/sales" 
            element={<Sales salesHistory={salesHistory} />} 
          />
          <Route 
            path="/reports" 
            element={
              <Reports 
                salesHistory={salesHistory}
                inventory={inventory}
              />
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
