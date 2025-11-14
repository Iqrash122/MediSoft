import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/login.jsx";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import Layout from "./layout/Layout.jsx";
import OrdersIndex from "./pages/orders/index.jsx";
import ProductsIndex from "./pages/products/index.jsx";
import SuppliersIndex from "./pages/suppliers/index.jsx";
import CustomersIndex from "./pages/customers/index.jsx";
import OrderCreate from "./pages/orders/create.jsx";
import CategoriesIndex from "./pages/categories/index.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* All pages using sidebar/topbar layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersIndex />} />
          <Route path="/orders/create" element={<OrderCreate />} />

          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/suppliers" element={<SuppliersIndex />} />
          <Route path="/customers" element={<CustomersIndex />} />
          {/* Add more pages here */}
          <Route path="/categories" element={<CategoriesIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
