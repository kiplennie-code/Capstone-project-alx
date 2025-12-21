export default function Sales({ salesHistory }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Sales History</h2>
      
      {salesHistory.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No sales recorded yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Complete your first sale in the POS section
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {salesHistory.map(sale => (
            <div key={sale.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-lg">Sale #{sale.id}</p>
                  <p className="text-sm text-gray-500">{sale.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    KSh {sale.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {sale.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-3 space-y-2">
                {sale.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="flex-1 line-clamp-1">
                      {item.title} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span className="font-medium ml-4">
                      KSh {(item.priceKSh * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-3 pt-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KSh {sale.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (16%):</span>
                  <span>KSh {sale.tax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
