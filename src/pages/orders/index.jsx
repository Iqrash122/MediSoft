import { FiFilter } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 ">
            <input
              type="text"
              placeholder="User Name"
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
            onClick={() => {
              navigate("/orders/create");
              console.log("Button clicked");
            }}
          >
            <button
              className="
                    flex gap-2 bg-[#59B17A] text-white 
                    w-[42px] h-[42px] items-center justify-center
                    rounded-full hover:bg-[#4ba46f] transition-all
                    font-medium shadow-sm hover:shadow-md
                  "
            >
              <FiPlus className="text-lg" />
            </button>

            <span className="text-[14px] text-[#1D1E21]">Create New Order</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#1D1E211A] overflow-hidden mt-6">
          {/* Header */}
          <div className="bg-[#E7F1ED] px-6 py-4 font-semibold text-[#1D1E21]">
            All orders
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#1D1E2166] text-sm border-b border-r border-[#1D1E211A]">
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  User Info
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Address
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Products
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Order Date
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">Price</th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Alex Shatov",
                  email: "Mirpur-1",
                  spent: "12",
                  img: "https://i.pravatar.cc/40?img=1",
                  orderDate: "July 31, 2023",
                  price: 890.66,
                  status: "Delivered",
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#1D1E211A] border-r last:border-none"
                >
                  {/* USER INFO */}
                  <td className="px-6 py-4 flex items-center gap-3 border-[#1D1E211A] border-r">
                    <img
                      src={item.img}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                  </td>

                  {/* ADDRESS */}
                  <td className="px-6 py-4 text-gray-600 border-[#1D1E211A] border-r">
                    {item.email}
                  </td>

                  {/* PRODUCTS */}
                  <td className="px-6 py-4 text-gray-600 border-[#1D1E211A] border-r">
                    {item.spent}
                  </td>

                  {/* ORDER DATE */}
                  <td className="px-6 py-4 text-gray-600 border-[#1D1E211A] border-r">
                    {item.orderDate}
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-medium border-[#1D1E211A] border-r">
                    ${item.price}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="px-6 py-4">
                    <span
                      className={`
              px-3 py-[6px] rounded-full text-sm font-medium tracking-wide
              ${
                item.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : item.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : item.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }
            `}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
