import { ToastContainer } from "react-toastify";
import { Sidebar } from "./components/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full min-h-screen bg-slate-100">
      <Sidebar />
      <div className="w-full flex flex-col space-y-2">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-700">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Olá, Luan</span>
            <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
          </div>
        </header>

        {children}
      </div>
      <ToastContainer />
    </div>
  );
}
