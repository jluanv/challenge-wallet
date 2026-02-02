import type { ListAccountsOutput } from "@finance/validations";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type AccountCardProps = {
  acc: ListAccountsOutput[number];
  setId: Dispatch<SetStateAction<string | null>>;
  setIsDeposit: Dispatch<SetStateAction<boolean>>;
  setIsWithdraw: Dispatch<SetStateAction<boolean>>;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setIsTransfer: Dispatch<SetStateAction<boolean>>;
};
export default function AccountCard({
  acc,
  setId,
  setIsDeposit,
  setIsWithdraw,
  setIsDelete,
  setIsTransfer,
}: Readonly<AccountCardProps>) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      key={acc.id}
      className={`bg-white shadow rounded-lg p-4 relative ${acc.isActive ? "" : "opacity-70"}`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-indigo-600 font-semibold">
          {acc.name}
          {!acc.isActive && <p className="text-xs text-red-500">(Inativa)</p>}
        </h2>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-200"
            onClick={() =>
              setDropdownOpen(dropdownOpen === acc.id ? null : acc.id)
            }
          >
            ⋮
          </button>

          {dropdownOpen === acc.id && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded shadow-lg z-10">
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              >
                Editar
              </button>
              <button
                type="button"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  acc.isActive
                    ? "text-red-600 hover:bg-red-50"
                    : "text-green-600 hover:bg-green-50"
                }`}
                onClick={() => {
                  setId(acc.id);
                  setIsDelete(true);
                  setDropdownOpen(null);
                }}
              >
                {acc.isActive ? "Inativar" : "Ativar"}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-slate-700 mt-2">Saldo: R$ {acc.balance}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          type="button"
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          onClick={() => {
            setId(acc.id);
            setIsDeposit(true);
          }}
        >
          Depositar
        </button>

        <button
          type="button"
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          onClick={() => {
            setId(acc.id);
            setIsWithdraw(true);
          }}
        >
          Saque
        </button>

        {acc.balance > 0 && (
          <button
            type="button"
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
            onClick={() => {
              setId(acc.id);
              setIsTransfer(true);
            }}
          >
            Transferir
          </button>
        )}
      </div>
    </div>
  );
}
