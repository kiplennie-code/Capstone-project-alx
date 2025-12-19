import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/fakeStoreApi';
import { Search } from 'lucide-react';
import Loader from '../components/Loader';

export default function POS({ cart, setCart, inventory, setInventory, initializeInventory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
        initializeInventory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const convertToKSh = (price) => Math.round(price * 150);

  const addToCart = (product) => {
    const stock = inventory[product.id] || 0;
    const cartItem = cart.find(item => item.id === product.id);
    const currentQty = cartItem ? cartItem.quantity : 0;

    if (currentQty >= stock) {
      alert('Not enough stock!');
      return;
    }

    if (cartItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
            {filteredProducts.map(product => {
              const stock = inventory[product.id] || 0;
              return (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={stock === 0}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-lg transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-24 w-full object-contain mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <p className="text-green-600 font-bold text-lg">
                    KSh {convertToKSh(product.price)}
                  </p>
                  <p className={`text-xs mt-1 ${stock > 10 ? 'text-green-600' : stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                    Stock: {stock}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart Section - Placeholder */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cart</h2>
          <p className="text-gray-400 text-center py-8">
            Cart functionality coming 
          </p>
        </div>
      </div>
    </div>
  );
}
