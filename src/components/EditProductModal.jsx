import { useState } from "react";
import CategoryModal from "./CategoryModal";

function EditProductModal({ product, close }) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    stock: product.Stock,
    suppliers: product.supplier,
    category: product.category,
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl w-[520px] shadow-xl relative">
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-gray-600 hover:text-black text-xl cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-[24px] font-semibold text-[#1D1E21] mb-6">
            Edit Product
          </h2>

          {/* GRID START */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {/* Product Info */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">
                Product Info
              </label>
              <input
                type="text"
                value={form.name}
                name="name"
                onChange={(e) => updateField("name", e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 outline-none"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 outline-none"
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">Stock</label>
              <input
                type="text"
                name="stock"
                value={form.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 outline-none"
              />
            </div>

            {/* Suppliers */}
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1">
                Suppliers
              </label>
              <input
                type="text"
                name="supplier_id"
                value={form.suppliers}
                onChange={(e) => updateField("suppliers", e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[13px] text-gray-600">Category</label>
                <button
                  onClick={() => setCategoryOpen(true)}
                  className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#59B17A] text-white text-lg"
                >
                  +
                </button>
              </div>

              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 outline-none" name="category_id"
              >
                <option>{}</option>
               
              </select>
            </div>
          </div>
          {/* GRID END */}

          <div className="flex items-center gap-4 mt-8">
            <button className="px-8 py-2.5 rounded-full bg-[#59B17A] text-white font-medium">
              Update
            </button>

            <button
              onClick={close}
              className="px-8 py-2.5 rounded-full bg-gray-200 text-gray-700 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {categoryOpen && <CategoryModal close={() => setCategoryOpen(false)} />}
    </>
  );
}

export default EditProductModal;
