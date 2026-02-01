import Link from "next/link";
import { privateRoutes } from "@/routes/routes";
import LogoutButton from "./logout-button";

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold text-indigo-500">
        Finance Wallet
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link
          href={privateRoutes.DASHBOARD}
          className="block py-2 px-3 rounded hover:bg-slate-700"
        >
          🏠 Dashboard
        </Link>
        <Link
          href={privateRoutes.ACCOUNTS}
          className="block py-2 px-3 rounded hover:bg-slate-700"
        >
          💳 Contas
        </Link>
        <Link
          href={privateRoutes.TRANSACTIONS}
          className="block py-2 px-3 rounded hover:bg-slate-700"
        >
          📑 Transações
        </Link>
      </nav>
      <div className="p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
