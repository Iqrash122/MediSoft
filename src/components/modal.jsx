import { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";

function Modal({ close, onSuccess }) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Lists
  const [categories, setCategories] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.20:8000/api";
  const token = localStorage.getItem("Token");

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    setCategories(data.categories || []);
  };

  // ---------------- FETCH SUPPLIERS ----------------
  const fetchSuppliersList = async () => {
    const res = await fetch(`${API_URL}/suppliers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    setSupplierList(data.suppliers || []);
  };

  useEffect(() => {
    fetchCategories();
    fetchSuppliersList();
  }, []);

  // ---------------- ADD PRODUCT (POST) ----------------
  const addProduct = async () => {
    if (!name || !price || !stock || !supplierId || !categoryId) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          stock,
          supplier_id: supplierId, // FIXED
          category_id: categoryId, // FIXED
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess(); // refresh table
        close(); // close modal
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Add product failed:", error);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl w-[520px] shadow-xl relative animate-[fadeIn_0.2s_ease]">
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-gray-600 hover:text-black text-xl cursor-pointer"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-[24px] font-semibold text-[#1D1E21] mb-6">
            Add a new product
          </h2>

          {/* ========================= FORM GRID ========================= */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {/* Product Name */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                className="border border-gray-200 rounded-full px-4 py-2 
                focus:ring-2 focus:ring-[#59B17A] outline-none"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="border border-gray-200 rounded-full px-4 py-2 
                focus:ring-2 focus:ring-[#59B17A] outline-none"
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
                className="border border-gray-200 rounded-full px-4 py-2 
                focus:ring-2 focus:ring-[#59B17A] outline-none"
              />
            </div>

            {/* Supplier Dropdown */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">Supplier</label>

              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 
                  focus:ring-2 focus:ring-[#59B17A] outline-none"
              >
                <option value="">Select Supplier</option>

                {supplierList.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col col-span-2 mb-4">
              <label className="text-[13px] text-gray-600 mb-1">Category</label>

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 w-full
                text-gray-500 focus:ring-2 focus:ring-[#59B17A] outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ==================== BUTTONS ==================== */}
          <div className="flex items-center gap-4 mt-8">
            {/* ADD BUTTON */}
            <button
              onClick={addProduct}
              disabled={loading}
              className="px-8 py-2 rounded-full bg-[#59B17A] text-white font-medium 
              hover:bg-[#4ba46f] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>

            {/* CANCEL */}
            <button
              onClick={close}
              className="px-8 py-2 rounded-full bg-gray-200 text-gray-700 font-medium 
              hover:bg-gray-300 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Category Add Modal */}
      {categoryOpen && <CategoryModal close={() => setCategoryOpen(false)} />}
    </>
  );
}

export default Modal;
