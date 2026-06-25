import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/apiCall";
import { FaSearch } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    window.addEventListener("product-added", fetchProducts);
    return () => {
      window.removeEventListener("product-added", fetchProducts);
    };
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Explore Products
            </h1>
            <p className="text-slate-500 mt-1">
              Browse through our collection of premium items
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-slate-100 rounded-2xl bg-white p-4 space-y-4 animate-pulse">
                <div className="aspect-video bg-slate-200 rounded-xl" />
                <div className="h-6 bg-slate-200 rounded w-2/3" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-8 bg-slate-200 rounded w-1/4" />
                  <div className="h-8 bg-slate-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                refreshProducts={fetchProducts}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
              <BiPackage className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No products found</h3>
            <p className="text-slate-500 text-sm mt-1 text-center max-w-xs">
              Try search using a different term or add a new product from the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;