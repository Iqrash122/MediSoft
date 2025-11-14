export default function DashboardCard({ title, count, icon }) {
  return (
    <div
      className="
        border border-[#59B17A] 
      rounded-xl  bg-white
      p-5 
      w-[240px] h-[108px] 
      flex flex-col 
      justify-start 
      items-start 
      hover:bg-[#59B17A]/10 
      cursor-pointer 
      transition-all 
      duration-300 
      py-4
      hover:scale-105
        "
        >
      {/* ICON + TITLE */}
      <div className="flex items-center gap-3">
        <img src={icon} alt="Card Icon"  />
        <h2 className="text-[#1D1E21B3] text-[12px] ">
          {title}
        </h2>
      </div>

      {/* COUNT TEXT */}
      <h1 className="mt-6 text-[24px] font-semibold text-[#1D1E21]">
        {count}
      </h1>
    </div>
  );
}
