import { TrendingUp, ShoppingBag, DollarSign, Package } from 'lucide-react';

export default function Reports({ salesHistory, inventory }) {
  const totalSales = salesHistory.length;
  const totalRevenue = salesHistory.reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsSold = salesHistory.reduce((sum, sale) => 
    sum + sale.items.reduce((s, item) => s + item.quantity, 0), 0
  );
  
  const avgSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  const lowStockProducts = Object.entries(inventory).filter(([_, stock]) => stock < 10).length;
  const outOfStockProducts = Object.entries(inventory).filter(([_, stock]) => stock === 0).length;

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Total Sales',
      value: totalSales,
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `KSh ${totalRevenue.toFixed(2)}`,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      icon: Package,
      label: 'Items Sold',
      value: totalItemsSold,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      icon: TrendingUp,
      label: 'Avg Sale Value',
      value: `KSh ${avgSaleValue.toFixed(2)}`,
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Sales Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-lg p-6 border-2 ${stat.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <Icon size={24} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Package className="mr-2" size={20} />
              Inventory Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded">
                <span className="font-medium">Low Stock Products</span>
                <span className="text-yellow-700 font-bold text-xl">{lowStockProducts}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded">
                <span className="font-medium">Out of Stock</span>
                <span className="text-red-700 font-bold text-xl">{outOfStockProducts}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Recent Performance
            </h3>
            {salesHistory.length > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Last Sale:</span>
                  <span className="font-medium">
                    KSh {salesHistory[0]?.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Highest Sale:</span>
                  <span className="font-medium">
                    KSh {Math.max(...salesHistory.map(s => s.total)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lowest Sale:</span>
                  <span className="font-medium">
                    KSh {Math.min(...salesHistory.map(s => s.total)).toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No sales data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
