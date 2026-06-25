import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addProduct } from "../api/apiCall";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 520,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  outline: "none",
};

function AddProductModal({ open, handleClose, refreshProducts }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleReset = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
    });
    setImageFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description) {
      return toast.error("Please fill in all text fields");
    }

    if (!imageFile) {
      return toast.error("Please choose a product image to upload");
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("image", imageFile);

      await addProduct(data);
      toast.success("Product added successfully!");
      handleReset();
      handleClose();

      window.dispatchEvent(new Event("product-added"));
      if (refreshProducts) {
        refreshProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleReset();
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between items-center mb-6">
          <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight="extrabold" className="text-slate-800 tracking-tight">
            Add Product
          </Typography>
          <IconButton
            onClick={() => {
              handleReset();
              handleClose();
            }}
            size="small"
          >
            <MdClose size={24} />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              placeholder="e.g. Premium Leather Wallet"
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
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              placeholder="e.g. 1499"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Product Image
            </label>
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/70 transition-colors relative overflow-hidden group">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <FaCloudUploadAlt className="text-slate-400 group-hover:text-blue-500 transition-colors" size={28} />
                    <p className="mb-0.5 text-xs text-slate-500 font-semibold mt-1">
                      Click to upload image
                    </p>
                    <p className="text-[10px] text-slate-400">
                      PNG, JPG, JPEG, WEBP or GIF
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
              rows={3}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              placeholder="Describe features and details..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-sm"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}

export default AddProductModal;
