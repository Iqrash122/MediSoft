import { useEffect, useState } from "react";

export default function CategoriesIndex() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "http://192.168.1.20:8000/api/categories";
  const token = localStorage.getItem("Token");

  // Auto slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  // Load all categories
  const fetchCategories = async () => {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --------------------------
  // CREATE CATEGORY
  // --------------------------
  const createCategory = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ name, slug }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Category created successfully!");
      setName("");
      setSlug("");
      fetchCategories();
    } else {
      setMessage(data.message || "Create failed!");
    }
  };

  // --------------------------
  // UPDATE CATEGORY
  // --------------------------
  const updateCategory = async () => {
    const res = await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ name, slug }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Category updated successfully!");
      setName("");
      setSlug("");
      setEditId(null);
      fetchCategories();
    } else {
      setMessage(data.message || "Update failed!");
    }
  };

  // --------------------------
  // FORM SUBMIT HANDLER
  // --------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateCategory();
    } else {
      createCategory();
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    fetchCategories();
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>

      {message && (
        <div className="mb-4 text-green-600 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(generateSlug(e.target.value));
              }}
              className="input mt-3 w-full border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A] rounded-xl indent-4"
              placeholder="Category name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="input mt-3 w-full border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A] rounded-xl indent-4"
              placeholder="Auto slug"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[#59B17A] text-white rounded hover:bg-[#4a9d68]"
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-200">
                <td className="py-2">{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td className="text-right flex justify-end gap-2 py-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
