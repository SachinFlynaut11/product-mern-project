import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProducts, updateProduct } from "../api/apiCall";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await getProducts();
      const product = res.data.find((item) => item._id === id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
        });
        
        const resolvedUrl = product.image.startsWith("/uploads")
          ? `http://localhost:5000${product.image}`
          : product.image;
        setCurrentImageUrl(resolvedUrl);
      } else {
        toast.error("Product not found");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product details");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description) {
      return toast.error("All text fields are required");
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      await updateProduct(id, data);
      toast.success("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Edit Product
            </h1>
            <p className="text-slate-500 mt-1">
              Modify details of the selected product item
            </p>
          </div>

          {fetching ? (
            <div className="flex flex-col items-center justify-center py-12 animate-pulse space-y-4">
              <div className="h-10 bg-slate-200 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-full" />
              <div className="h-24 bg-slate-200 rounded w-full" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g. Premium Wireless Headphones"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g. 2999"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Update Product Image
                </label>
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/70 transition-colors relative overflow-hidden group">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : currentImageUrl ? (
                      <img
                        src={currentImageUrl}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaCloudUploadAlt className="text-slate-400 group-hover:text-blue-500 transition-colors" size={32} />
                        <p className="mb-1 text-sm text-slate-500 font-semibold mt-1">
                          Click to upload new image
                        </p>
                        <p className="text-xs text-slate-400">
                          PNG, JPG, JPEG, WEBP or GIF (Leave empty to keep current)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Write a compelling description for this product..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProduct;