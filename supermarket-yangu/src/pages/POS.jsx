import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/fakeStoreApi';
import { Plus, Minus, X, Search } from 'lucide-react';
import Loader from '../components/Loader';

export default function POS({ cart, setCart, inventory, setInventory, setSalesHistory, salesHistory, initializeInventory }) {
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

  const updateQuantity = (id, delta) => {
    const item = cart.find(c => c.id === id);
    const stock = inventory[id] || 0;
    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    if (newQuantity > stock) {
      alert('Not enough stock!');
      return;
    }

    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (window.confirm('Clear entire cart?')) {
      setCart([]);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (convertToKSh(item.price) * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const sale = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart.map(item => ({
        ...item,
        priceKSh: convertToKSh(item.price)
      })),
      subtotal,
      tax,
      total
    };

    // Update inventory
    const newInventory = { ...inventory };
    cart.forEach(item => {
      newInventory[item.id] = (newInventory[item.id] || 0) - item.quantity;
    });
    setInventory(newInventory);

    setSalesHistory([sale, ...salesHistory]);
    setCart([]);
    alert(`Sale completed! Total: KSh ${total.toFixed(2)}`);
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

      {/* Cart Section */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Cart</h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm flex-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      KSh {convertToKSh(item.price)} each
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>KSh {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT (16%):</span>
              <span>KSh {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-green-700 pt-2 border-t">
              <span>Total:</span>
              <span>KSh {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
}
