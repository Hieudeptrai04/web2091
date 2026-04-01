import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Button } from "antd";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { user, setUser } = context;

  const themeContext = useContext(ThemeContext);
  if(!themeContext) return null;
  const {theme, toggleTheme} = themeContext;

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="#" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="#" className="hover:text-gray-200">
            Trang chủ
          </Link>
          <Link to="/list" className="hover:text-gray-200">
            Danh sách
          </Link>
          <Link to="/add" className="hover:text-gray-200">
            Thêm mới
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
            {user && (<img src={user.avatar} className="w-8 h-8 rounded-full object-cover"/>)}
            {user?.name || "Guest"}
          <Button onClick={() => setUser({avatar:'https://upload.wikimedia.org/wikipedia/vi/3/39/First_dragon_ball_shounen_jump.jpg',name: 'huongtp62'})}>Login</Button>
          <Button onClick={()=>setUser(null)}>Logout</Button>
          <Button onClick={toggleTheme}>
            {theme === "light" ? "☼" : "☽"}
          </Button>
          {/* <Link to="#" className="hover:text-gray-200">
            Đăng nhập
          </Link>
          <Link to="#" className="hover:text-gray-200">
            Đăng ký
          </Link> */}
        </div>
      </div>
    </nav>
  );
}