"use client";

import { publicRoutes } from "@/routes/routes";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    globalThis.location.href = publicRoutes.LOGIN;
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded w-full"
    >
      Sair
    </button>
  );
}
