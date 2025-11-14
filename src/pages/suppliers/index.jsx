import { useState, useEffect } from "react";
import { FiFilter, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import AddSupplierModal from "../../components/AddSupplierModal";

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);

  const API_URL = "http://192.168.1.20:8000/api/suppliers";
  const token = localStorage.getItem("Token");

  // ---------------- FETCH SUPPLIERS ----------------
  const fetchSuppliers = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      setSuppliers(data.suppliers || []);
    } catch (error) {
      console.error("Error loading suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <>
      <div>
        {/* TOP BAR */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Supplier Name"
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
            onClick={() => setOpen(true)}
          >
            <button
              className="
                flex gap-2 bg-[#59B17A] text-white 
                w-[42px] h-[42px] items-center justify-center
                rounded-full hover:bg-[#4ba46f] transition-all
                shadow-sm hover:shadow-md
              "
            >
              <FiPlus className="text-lg" />
            </button>
            <span className="text-[14px] text-[#1D1E21]">
              Add a new supplier
            </span>
          </div>
        </div>

        {/* SUPPLIERS TABLE */}
        <div className="bg-white rounded-xl border border-[#1D1E211A] overflow-hidden mt-6">
          <div className="bg-[#E7F1ED] px-6 py-4 font-semibold text-[#1D1E21]">
            All Suppliers
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-[#1D1E2166] text-sm border-b border-r border-[#1D1E211A]">
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Supplier Name
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Address
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Company
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">Phone</th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Balance
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Status
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#1D1E211A] border-r last:border-none"
                >
                  <td className="px-6 py-4 border-r">{item.name}</td>

                  <td className="px-6 py-4 border-r">{item.address}</td>

                  <td className="px-6 py-4 border-r">{item.company}</td>

                  <td className="px-6 py-4 border-r">{item.phone}</td>

                  <td className="px-6 py-4 border-r">${item.balance}</td>

                  <td className="px-6 py-4 border-r">
                    <span
                      className={`
                        px-3 py-[6px] rounded-full text-sm font-medium
                        ${
                          item.status == 1
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {item.status == 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <FiEdit />
                    </button>

                    <button className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {open && (
          <AddSupplierModal
            close={() => setOpen(false)}
            onSuccess={fetchSuppliers} // <-- refresh list after add
          />
        )}
      </div>
    </>
  );
}

export default SuppliersPage;
