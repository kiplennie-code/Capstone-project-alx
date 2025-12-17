import { Link } from 'react-router-dom';
import supermarketImage from "../assets/super.jpeg";
import { ShoppingCart, Package, TrendingUp } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Point of Sale',
      description: 'Quick and efficient checkout system with cart management',
      link: '/pos',
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels and manage products efficiently',
      link: '/products',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics',
      description: 'View sales reports and business insights',
      link: '/reports',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-700 mb-4">
          Welcome to Supermarket Yangu 🇰🇪
        </h2>
        <p className="text-xl text-gray-600">
          Your complete supermarket management solution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <img
  src={supermarketImage}
  alt="Supermarket"
  className="w-full h-64 object-cover rounded-lg mb-6"
  loading="lazy"
/>

        <h3 className="text-2xl font-bold mb-4">Modern POS System</h3>
        <p className="text-gray-600 mb-4">
          Supermarket Yangu provides a complete point-of-sale solution designed for Kenyan supermarkets. 
          Manage inventory, process sales, and track your business performance all in one place.
        </p>
        <Link
          to="/pos"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Start Selling
        </Link>
      </div>
    </div>
  );
}
