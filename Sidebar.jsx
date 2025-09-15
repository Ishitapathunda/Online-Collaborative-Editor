import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">C++ Trainer</h1>
      <nav className="flex flex-col space-y-3">
        <Link to="/" className="hover:text-blue-400">🏠 Home</Link>
        <Link to="/editor" className="hover:text-blue-400">💻 Editor</Link>
        <Link to="/login" className="hover:text-blue-400">🔑 Login</Link>
        <Link to="/signup" className="hover:text-blue-400">📝 Signup</Link>
      </nav>
    </aside>
  );
}
