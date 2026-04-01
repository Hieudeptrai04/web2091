import { Button } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { user, setUser } = context;

  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { theme, toggleTheme } = themeContext;

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="#" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="#" className="hover:text-gray-200">
            Trang chu
          </Link>
          <Link to="/list" className="hover:text-gray-200">
            Danh sach
          </Link>
          <Link to="/add" className="hover:text-gray-200">
            Them moi
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <img
              src={user.avatar}
              alt={`${user.name} avatar`}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          {user?.name || "Guest"}
          <Button
            onClick={() =>
              setUser({ avatar: "/hieunv-avatar.svg", name: "hieunv" })
            }
          >
            Login
          </Button>
          <Button onClick={() => setUser(null)}>Logout</Button>
          <Button onClick={toggleTheme}>
            {theme === "light" ? "Sun" : "Moon"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
