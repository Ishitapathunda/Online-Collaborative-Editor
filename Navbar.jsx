export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">C++ Trainer Dashboard</h2>
      <div className="space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
          Profile
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
