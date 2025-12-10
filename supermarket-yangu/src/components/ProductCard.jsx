export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow p-4 bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />

      <h3 className="font-bold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>

      <p className="text-green-600 font-bold mt-2">
        KSh {Math.round(product.price * 150)}
      </p>

      <button className="mt-3 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}
