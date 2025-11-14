import { FiFilter } from "react-icons/fi";

function Index() {
  return (
    <>
      <div>
        <div className="flex flex-row gap-4 ">
          <input
            type="text"
            placeholder="Search Customer"
            className="bg-white rounded-full border border-gray-200 px-5 py-2 outline-none focus:ring-2 focus:ring-[#59B17A]"
          />

          <button
            type="submit"
            onClick={() => navigate("/dashboard")}
            className="bg-[#59B17A] hover:bg-[#4ba46f] cursor-pointer 
             text-white font-medium py-3 px-6 rounded-full 
             transition-all flex items-center gap-2 justify-center"
          >
            <FiFilter className="text-lg" />
            Filter
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[#1D1E211A] overflow-hidden mt-6">
          {/* Header */}
          <div className="bg-[#E7F1ED] px-6 py-4 font-semibold text-[#1D1E21]">
            All Customers
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#1D1E2166] text-sm border-b border-r border-[#1D1E211A]">
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  User Info
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Email
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Address
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Phone
                </th>
                <th className="px-6 py-3 border-r border-[#1D1E211A]">
                  Register date
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Alex Shatov",
                  email: "alexshatov@gmail.com",
                  Address: "Sargodha",
                  img: "https://i.pravatar.cc/40?img=1",
                  Phone: "03198843589",
                  Register_date: "July 31, 2023",
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
                    {item.Address}
                  </td>

                  {/* ORDER DATE */}
                  <td className="px-6 py-4 text-gray-600 border-[#1D1E211A] border-r">
                    {item.Phone}
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-medium border-[#1D1E211A] border-r">
                    {item.Register_date}
                  </td>

                  {/* STATUS BADGE */}
                 
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
