"use client";

import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
}: Readonly<ModalProps>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
