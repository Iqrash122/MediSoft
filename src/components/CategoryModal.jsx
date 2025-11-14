import { useState, useEffect } from "react";

export default function CategoryModal({ close }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // Auto slug generation
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")
        .replace(/[^\w-]/g, "")
    );
  }, [name]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-7 rounded-2xl w-[420px] shadow-xl relative animate-[fadeIn_0.2s_ease]">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-5 right-5 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-5">Add New Category</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-200 rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[#59B17A] outline-none"
          />

          <input
            type="text"
            placeholder="Slug"
            value={slug}
            readOnly
            className="border border-gray-200 rounded-full px-4 py-2.5 bg-gray-100 text-gray-500"
          />

          <button className="bg-[#59B17A] cursor-pointer hover:bg-[#4ba46f] text-white py-2.5 rounded-full transition-all">
            Save Category
          </button>

          <button
            onClick={close}
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-700 py-2.5 rounded-full transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
