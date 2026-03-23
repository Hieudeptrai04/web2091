import { Toaster } from "react-hot-toast";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Lab4 from "./pages/Lab4";
import Lab5 from "./pages/Lab5";
import Lab6 from "./pages/Lab6";

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/list" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium md:text-base">
            <Link to="/list" className="hover:text-gray-200">
              Danh sach
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Them moi
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<Lab5 />} />
          <Route path="/add" element={<Lab4 />} />
          <Route path="/edit/:id" element={<Lab6 />} />
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </main>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
