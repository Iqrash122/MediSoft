import { FiFilter, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import EditProductModal from "../../components/EditProductModal";

function Index() {
  const [open, IsOpen] = useState(false); // Add Modal
  const [editOpen, setEditOpen] = useState(false); // Edit Modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://192.168.1.20:8000/api/products";
  const token = localStorage.getItem("Token");

  // --------------------- FETCH ALL PRODUCTS ---------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      console.error("Fetch products failed:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --------------------- DELETE PRODUCT ---------------------
  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    fetchProducts(); // reload
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="bg-white rounded-full border border-gray-200 px-5 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
          />

          <button
            type="submit"
            className="bg-[#59B17A] hover:bg-[#4ba46f] cursor-pointer 
              text-white font-medium py-3 px-6 rounded-full 
              transition-all flex items-center gap-2 justify-center"
          >
            <FiFilter className="text-lg" />
            Filter
          </button>
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => IsOpen(true)}
        >
          <button
            className="flex gap-2 bg-[#59B17A] text-white 
              w-[42px] h-[42px] items-center justify-center
              rounded-full hover:bg-[#4ba46f] transition-all
              font-medium shadow-sm hover:shadow-md"
          >
            <FiPlus className="text-lg" />
          </button>

          <span className="text-[14px] text-[#1D1E21]">Add a new product</span>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white rounded-xl border border-[#1D1E211A] overflow-hidden mt-6">
        <div className="bg-[#E7F1ED] px-6 py-4 font-semibold text-[#1D1E21]">
          All Products
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#1D1E2166] text-sm border-b border-r border-[#1D1E211A]">
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Product Info
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Category
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">Stock</th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Suppliers
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">Price</th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#1D1E211A] border-r"
                >
                  <td className="px-6 py-4 flex items-center gap-3 border-r">
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600 border-r">
                    {item?.category?.name || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-600 border-r">
                    {item.stock}
                  </td>

                  <td className="px-6 py-4 text-gray-600 border-r">
                    {item?.supplier?.name || "—"}
                  </td>

                  <td className="px-6 py-4 font-medium border-r">
                    ${item.price}
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* EDIT */}
                    <button
                      className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
                      onClick={() => {
                        setSelectedProduct(item);
                        setEditOpen(true);
                      }}
                    >
                      <FiEdit className="text-lg" />
                    </button>

                    {/* DELETE */}
                    <button
                      className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                      onClick={() => deleteProduct(item.id)}
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODALS */}
      {open && <Modal close={() => IsOpen(false)} onSuccess={fetchProducts} />}

      {editOpen && (
        <EditProductModal
          product={selectedProduct}
          close={() => setEditOpen(false)}
          onSuccess={fetchProducts}
        />
      )}
    </>
  );
}

export default Index;
