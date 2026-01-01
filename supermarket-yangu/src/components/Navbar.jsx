import { NavLink } from 'react-router-dom';
import { ShoppingCart, Home, Package, DollarSign, BarChart3 } from 'lucide-react';

export default function Navbar({ cartCount }) {
  // navigation items
  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/pos', label: 'POS', icon: ShoppingCart },
    { to: '/products', label: 'Products', icon: Package },
    { to: '/sales', label: 'Sales', icon: DollarSign },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">🇰🇪 Supermarket Yangu POS</h1>
            <p className="text-green-100 text-sm">Nairobi, Kenya</p>
          </div>
          {cartCount > 0 && (
            <div className="bg-white text-green-700 px-4 py-2 rounded-full font-bold">
              Cart: {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </div>
          )}
        </div>
        
        <nav className="flex space-x-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive 
                    ? 'flex items-center space-x-2 px-4 py-2 rounded bg-green-800 text-white'
                    : 'flex items-center space-x-2 px-4 py-2 rounded text-green-100 hover:bg-green-600'
                }
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
