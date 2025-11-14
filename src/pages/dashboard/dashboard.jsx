import DashboardCard from "../../components/DashboardCard";

import ProductIcon from "../../assets/product.png";
import SupplierIcon from "../../assets/customer.png";
import CustomerIcon from "../../assets/customer.png";

export default function Dashboard() {
  
  return (
    <div className="p-6 flex flex-col gap-8">

      {/* ===== TOP CARDS ===== */}
      <div className="flex gap-6 flex-wrap">
        <DashboardCard 
          title="All Products" 
          count="8,430" 
          icon={ProductIcon} 
        />

        <DashboardCard 
          title="All Suppliers" 
          count="211" 
          icon={SupplierIcon} 
        />

        <DashboardCard 
          title="All Customers" 
          count="140" 
          icon={CustomerIcon} 
        />
      </div>


      {/* ===== BOTTOM GRID SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ---------------- Recent Customers Table ---------------- */}
        <div className="bg-white rounded-xl border border-[#1D1E211A] overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#E7F1ED] px-6 py-4 font-semibold text-[#1D1E21]">
            Recent Customers
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="text-left  text-[#1D1E2166] text-sm border-b border-r border-[#1D1E211A]">
                <th className="px-6 py-3 border-r border-[#1D1E211A] ">Name</th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">Email</th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">Spent</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Alex Shatov",
                  email: "alexshatov@gmail.com",
                  spent: "2,890.66",
                  img: "https://i.pravatar.cc/40?img=1",
                },
                {
                  name: "Philip Harbach",
                  email: "philip.h@gmail.com",
                  spent: "2,767.04",
                  img: "https://i.pravatar.cc/40?img=5",
                },
                {
                  name: "Mirko Fisuk",
                  email: "mirkofisuk@gmail.com",
                  spent: "2,996.00",
                  img: "https://i.pravatar.cc/40?img=11",
                },
                {
                  name: "Olga Semklo",
                  email: "olga.s@cool.design",
                  spent: "1,220.66",
                  img: "https://i.pravatar.cc/40?img=12",
                },
                {
                  name: "Burak Long",
                  email: "longburak@gmail.com",
                  spent: "1,890.66",
                  img: "https://i.pravatar.cc/40?img=14",
                },
              ].map((item, index) => (
                <tr key={index} className="border-b border-[#1D1E211A] border-r last:border-none">
                  <td className="px-6 py-4 flex items-center gap-3 border-[#1D1E211A] border-r">
                    <img
                      src={item.img}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 border-[#1D1E211A] border-r">{item.email}</td>
                  <td className="px-6 py-4 font-medium">{item.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* ---------------- Income / Expenses Section ---------------- */}
        <div className="bg-[white] rounded-xl border border-gray-200 overflow-hidden">

          {/* Header */}
          <div className="bg-[#E7F1ED] px-6 py-4 font-semibold text-[#1D1E21]">
            Income/Expenses
          </div>

          <div className="px-6 py-4 text-gray-500 text-sm border-b border-[#1D1E211A]">
            Today
          </div>

          {/* List Items */}
          <div className="border-b border-[#1D1E211A] last:border-none ">

            {[
              { type: "Expense", color: "bg-red-100 text-red-500", label: "Qonto billing", amount: "-49.88" },
              { type: "Income", color: "bg-green-100 text-green-600", label: "Cruip.com Market Ltd 70 Wilson St London", amount: "+249.88" },
              { type: "Income", color: "bg-green-100 text-green-600", label: "Notion Labs Inc", amount: "+99.99" },
              { type: "Income", color: "bg-green-100 text-green-600", label: "Market Cap Ltd", amount: "+1,200.88" },
              { type: "Error", color: "bg-gray-200 text-gray-700", label: "App.com Market Ltd 70 Wilson St London", amount: "-99.99" },
              { type: "Expense", color: "bg-red-100 text-red-500", label: "App.com Market Ltd 70 Wilson St London", amount: "-49.88" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center px-6 py-4 border-b border-[#1D1E211A] last:border-none ">
                
                {/* Tag + Label */}
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${item.color}`}>
                    {item.type}
                  </span>
                  <p className="text-gray-700">{item.label}</p>
                </div>

                {/* Amount */}
                <p className={`font-semibold ${item.amount.includes('-') ? 'text-red-500' : 'text-green-600'}`}>
                  {item.amount}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}
