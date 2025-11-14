import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaShoppingCart,
  FaFlask,
  FaUsers,
  FaPills,
} from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";

import Logo from "../assets/logo1.png";

export default function Sidebar() {
  return (
    <aside
      className="
        h-screen 
        w-[90px] 
        border-r 
        border-gray-200 
        flex flex-col 
        items-center 
        py-8 
      "
    >
      {/* Logo */}
      <div className="mb-14 transition-all duration-300 hover:scale-110">
        <img
          src={Logo}
          alt="logo"
          className="w-[45px] h-[45px] drop-shadow-sm"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-8">
        <NavItem icon={<FaThLarge />} label="Dashboard" to="/dashboard" />
        <NavItem icon={<FaShoppingCart />} label="Orders" to="/orders" />
        <NavItem icon={<FaFlask />} label="Products" to="/products" />
        <NavItem icon={<FaPills />} label="Suppliers" to="/suppliers" />
        <NavItem icon={<FaUsers />} label="Customers" to="/customers" />
        <NavItem icon={<BiCategoryAlt />} label="categories" to="/categories" />
      </nav>
    </aside>
  );
}

function NavItem({ icon, to, label }) {
  return (
    <NavLink
      to={to}
      title={label}
      className={({ isActive }) =>
        `
        w-[50px] 
        h-[50px] 
        flex 
        items-center 
        justify-center 
        rounded-2xl
        text-[22px]
        transition-all 
        duration-300
        group
        ${
          isActive
            ? "bg-[#59B17A]/20 text-[#59B17A] shadow-md scale-110 backdrop-blur-sm"
            : "bg-white text-gray-400 hover:text-[#59B17A] hover:scale-105 hover:shadow-sm"
        }
      `
      }
    >
      {icon}

      {/* Tooltip Hover */}
      <span
        className="
          absolute left-[85px] 
          opacity-0 
          group-hover:opacity-100 
          transition-all 
          duration-300 
          bg-[#59B17A] 
          text-white 
          text-xs 
          px-3 
          py-1 
          rounded-md 
          whitespace-nowrap 
          shadow-md
        "
      >
        {label}
      </span>
    </NavLink>
  );
}
