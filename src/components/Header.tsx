import { Button } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { theme, toggleTheme } = themeContext;
  const { user, logout } = useAuthStore();
  const isLoggedIn = Boolean(user);
  const emailLabel = isLoggedIn
    ? `Email: ${user?.email ?? ""}`
    : "Email: Ch\u01b0a \u0111\u0103ng nh\u1eadp";
  const statusLabel = isLoggedIn
    ? "\u0110\u00e3 \u0111\u0103ng nh\u1eadp"
    : "Kh\u00e1ch";

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
          <span>{emailLabel}</span>
          <span>{statusLabel}</span>
          {isLoggedIn ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
            </>
          )}
          <Button onClick={toggleTheme}>
            {theme === "light" ? "Sun" : "Moon"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
