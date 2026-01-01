export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-12">
      <p>Supermarket Yangu By Leonard Kipkoech DEV© {year} - Nairobi, Kenya 🇰🇪</p>
      {/* TODO: Maybe add social links here later */}
      <p className="text-sm text-gray-400 mt-1">Powered by FakeStore API</p>
    </footer>
  );
}
