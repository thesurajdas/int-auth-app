function Card({ title, totalUsers, icon }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center p-4">
        <div className="p-3 bg-blue-100 rounded-full text-blue-500">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-700 text-nowrap">{title}</h3>
          <p className="text-xl font-bold text-gray-900">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
