import { Link } from "react-router-dom";
import { likeProduct, deleteProduct } from "../api/apiCall";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

function ProductCard({ product, refreshProducts }) {
  const { user, fetchProfile } = useAuth();

  const isLiked = user?.likedProducts?.some(
    (item) => (typeof item === "object" && item !== null ? item._id : item) === product._id
  );

  const handleLike = async () => {
    try {
      await likeProduct(product._id);
      
      await fetchProfile();

      if (isLiked) {
        toast("Removed from Liked Products", {
          icon: "💔",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.success(`You liked "${product.name}"!`, {
          icon: "❤️",
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#333",
          },
        });
      }

      if (refreshProducts) {
        refreshProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not update like state");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      toast.success(`"${product.name}" deleted!`, {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      if (refreshProducts) refreshProducts();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete product");
    }
  };

  const imageUrl = product.image.startsWith("/uploads")
    ? `http://localhost:5000${product.image}`
    : product.image;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-video bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
          }}
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={handleLike}
            className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-200 cursor-pointer ${
              isLiked
                ? "bg-rose-50 text-rose-500 hover:bg-rose-100 scale-110"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500"
            }`}
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2 min-h-[40px]">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-2xl font-black text-blue-600">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <div className="flex items-center gap-2">
            <Link
              to={`/edit/${product._id}`}
              className="flex items-center gap-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-3.5 py-2 rounded-lg font-medium text-sm transition-all border border-gray-200 hover:border-blue-200"
            >
              <FaEdit size={14} />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 px-3.5 py-2 rounded-lg font-medium text-sm transition-all border border-red-200 hover:border-red-300 cursor-pointer"
            >
              <FaTrash size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;