import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../api/apiCall";
import { FaUser, FaEnvelope, FaPhone, FaHeart, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (error) {
      console.error("Error loading profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-4 animate-pulse">
            <div className="h-16 w-16 bg-slate-200 rounded-full mx-auto" />
            <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
            <div className="space-y-3 pt-6">
              <div className="h-10 bg-slate-200 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-full" />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative" />

            <div className="px-8 pb-8 relative">
              <div className="h-24 w-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center -mt-12 text-slate-800 text-3xl font-extrabold select-none mx-auto md:mx-0">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>

              <div className="mt-4 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {user?.name}
                </h1>
                <p className="text-slate-500 font-medium">User Profile</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <FaUser size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </p>
                    <p className="text-slate-800 font-semibold text-base mt-0.5">
                      {user?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-slate-800 font-semibold text-base mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Mobile Number
                    </p>
                    <p className="text-slate-800 font-semibold text-base mt-0.5">
                      {user?.mobile}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/liked-products"
                  className="flex-1 flex items-center justify-between p-4 rounded-xl border border-pink-100 hover:border-pink-200 bg-pink-50/30 hover:bg-pink-50/75 transition-all text-pink-600 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <FaHeart />
                    <span>View Wishlist</span>
                  </div>
                  <FaChevronRight size={14} />
                </Link>

                <Link
                  to="/"
                  className="flex-1 flex items-center justify-between p-4 rounded-xl border border-blue-100 hover:border-blue-200 bg-blue-50/30 hover:bg-blue-50/75 transition-all text-blue-600 font-semibold"
                >
                  <span>Go to Shop</span>
                  <FaChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;