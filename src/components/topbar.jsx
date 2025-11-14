import { FiLogOut } from "react-icons/fi";
import Logout from "../assets/logout.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User")).email
    : "user@gmail.com";

  const location = useLocation();

  const pageName =
    location.pathname.split("/").filter(Boolean).pop() || "Dashboard";

  const formattedPage = pageName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // ---------------------- LOGOUT FUNCTION ----------------------
  const handleLogout = async () => {
    const token = localStorage.getItem("Token");

    try {
      const res = await fetch("http://192.168.1.20:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear local storage
      localStorage.removeItem("Token");
      localStorage.removeItem("User");

      // Redirect to login
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear user and redirect
      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      navigate("/");
    }
  };

  return (
    <div className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Medicine store
          </h2>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            {formattedPage} | <span className="text-gray-500">{email}</span>
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-10 h-10 rounded-full bg-[#5DB68E] flex items-center justify-center 
                   hover:scale-105 transition-all cursor-pointer"
      >
        <img src={Logout} alt="Logout" />
      </button>
    </div>
  );
}
