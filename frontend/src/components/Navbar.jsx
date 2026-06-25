import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaPlus, FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import toast from "react-hot-toast";

function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-slate-900 text-white shadow-xl px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
            P
          </div>
          <Link to="/" className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
            Product Hub
          </Link>
        </div>

        {isAuthenticated && (
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all font-medium text-gray-200 hover:text-white"
            >
              <FaHome className="text-blue-400" />
              <span>Home</span>
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all font-medium text-gray-200 hover:text-white cursor-pointer"
            >
              <FaPlus className="text-emerald-400" />
              <span>Add Product</span>
            </button>

            <Link
              to="/liked-products"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all font-medium text-gray-200 hover:text-white"
            >
              <FaHeart className="text-pink-500" />
              <span>Liked</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all font-medium text-gray-200 hover:text-white"
            >
              <FaUser className="text-purple-400" />
              <span>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-950/40 text-red-400 hover:text-red-300 font-medium transition-all cursor-pointer border border-transparent hover:border-red-900/30"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>

      {isAuthenticated && (
        <AddProductModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

export default Navbar;