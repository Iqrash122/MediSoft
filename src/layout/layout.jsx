import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";

export default function Layout() {
  return (
    <div className="flex bg-[#F8FAFB] min-h-screen">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
