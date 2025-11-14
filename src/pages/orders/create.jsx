import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
export default function OrderCreate() {
    const navigate  = useNavigate();
  return (
    <div className="p-6  min-h-screen">
        <div className="mb-5 text-[24px] w-[30%] text-[#59B17A] font-semibold cursor-pointer flex flex-row gap-2 justify-center items-center" onClick={() => navigate('/orders')}>
             <FiArrowLeft />Back to Orders
        </div>
      <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm">
        <input
          type="text"
          placeholder="Enter Name, Barcode number"
          className="w-1/3 py-2 border border-gray-200 px-5 outline-none focus:ring-2 focus:ring-[#59B17A]"
        />

        <h2 className="text-lg font-semibold">14 November 2025</h2>

        <span></span>
      </div>

      <div className="flex mt-4 gap-4">
        <div className="w-32 bg-white rounded-lg shadow-sm p-3 flex flex-col gap-4">
        
          <QuickBtn icon="➕" />
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-8 gap-2 text-sm font-semibold border-b pb-2">
            <div>Bill No</div>
            <div className="col-span-2">Product</div>
            <div>Packing</div>
            <div>Unit</div>
            <div>Qty</div>
            <div>Amount</div>
            <div>Total</div>
          </div>

          <div className="h-[420px] flex items-center justify-center text-gray-400">
            No items added yet...
          </div>

          <div className="flex justify-end text-sm font-semibold border-t pt-2">
            <p>Total Items: 0 &nbsp;&nbsp; | &nbsp;&nbsp; Qty: 0</p>
          </div>

          <div className="mt-4 border rounded-lg p-3 bg-gray-50">
            <h3 className="text-md font-semibold mb-3">Customer Details</h3>

            <div className="grid grid-cols-4 gap-3 text-sm">
              <input placeholder="Name" className="input border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A] rounded-xl indent-4" />
              <input placeholder="Phone" className="input border border-gray-200 px-5  outline-none focus:ring-2 focus:ring-[#59B17A] py-2 rounded-xl indent-4" />
              <select className="input border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A] py-2 rounded-xl indent-4">
                <option>Cash</option>
                <option>Card</option>
              </select>
              <input type="date" className="input border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A] py-2 rounded-xl indent-4" />
            </div>

            <input placeholder="Address" className="input mt-3 w-full border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A] rounded-xl indent-4" />
          </div>
        </div>

        <div className="w-64 bg-white rounded-lg shadow-sm p-4 text-sm">
          <TotalBox label="Rounded Amount" />
          <TotalBox label="Discount" />
          <TotalBox label="Delivery Charge" />
          <TotalBox label="Add Others" />

          <hr className="my-2" />

          <TotalBox label="Sub Total" />
          <TotalBox label="Taxable Amount" />
          <TotalBox label="Tax" />

          <div className="mt-3 p-3 bg-[#59B17A] text-white   text-xl text-center font-bold rounded">
            Pkr 0
          </div>
        </div>
      </div>

     
    </div>
  );
}

function QuickBtn({ icon }) {
  return (
    <div className="h-16 bg-green-50 border border-green-200 flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-100 text-2xl">
      {icon}
    </div>
  );
}

function TotalBox({ label }) {
  return (
    <div className="flex justify-between mb-2">
      <span>{label}</span>
      <span>Pkr 0.00</span>
    </div>
  );
}

