import { useState } from "react";

function AddSupplierModal({ close, onSuccess }) {
  const [supplierName, setSupplierName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");

  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.20:8000/api/suppliers";
  const token = localStorage.getItem("Token");

  // ---------------- ADD SUPPLIER ----------------
  const addSupplier = async () => {
    if (!supplierName || !address || !company || !balance) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: supplierName,
          address,
          company,
          phone: phone || "N/A",
          balance: parseInt(balance),
          status: 1,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess(); // refresh table
        close(); // close modal
      } else {
        alert(data.message || "Failed to add supplier");
      }
    } catch (error) {
      console.error("Supplier add failed:", error);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl w-[520px] shadow-xl relative">
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>

          <h2 className="text-[24px] font-semibold text-[#1D1E21] mb-6">
            Add New Supplier
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {/* Name */}
            <div className="col-span-2 flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Supplier Name
              </label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Enter name"
                className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
              />
            </div>

            {/* Address */}
            <div className="col-span-2 flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
              />
            </div>

            {/* Company */}
            <div className="col-span-2 flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company"
                className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone"
                className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
              />
            </div>

            {/* Balance */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Balance</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="Enter balance"
                className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={addSupplier}
              disabled={loading}
              className="px-8 py-2 rounded-full bg-[#59B17A] text-white hover:bg-[#4ba46f] disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>

            <button
              onClick={close}
              className="px-8 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSupplierModal;
