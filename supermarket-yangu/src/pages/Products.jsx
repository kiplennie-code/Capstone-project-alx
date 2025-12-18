import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/fakeStoreApi';
import Loader from '../components/Loader';

export default function Products({ inventory, initializeInventory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Product Inventory</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Price (KSh)</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const stock = inventory[product.id] || 0;
              return (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-12 w-12 object-contain"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium max-w-xs line-clamp-2">
                      {product.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {convertToKSh(product.price)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold">{stock}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stock > 20 ? 'bg-green-100 text-green-800' :
                      stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                      stock > 0 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {stock > 20 ? 'In Stock' : 
                       stock > 10 ? 'Good' :
                       stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
