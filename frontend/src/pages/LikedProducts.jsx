import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getLikedProducts } from "../api/apiCall";
import { FaHeart } from "react-icons/fa";
import { BiHeartCircle } from "react-icons/bi";

function LikedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedProducts = async () => {
    try {
      const res = await getLikedProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching liked products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <FaHeart className="text-pink-500" />
            <span>Liked Products</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Your personal collection of bookmarked and favorited items
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((n) => (
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
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                refreshProducts={fetchLikedProducts}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="h-16 w-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-4">
              <BiHeartCircle className="text-pink-400" size={36} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Your wishlist is empty</h3>
            <p className="text-slate-500 text-sm mt-1 text-center max-w-xs">
              Go back to the homepage and press the heart icon to save products to this page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedProducts;