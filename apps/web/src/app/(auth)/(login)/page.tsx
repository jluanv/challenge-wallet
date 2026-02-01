import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="shadow-lg rounded-lg w-full max-w-md p-8 bg-slate-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Finance Wallet</h1>
        <p className="text-slate-500">Entre na sua conta</p>
      </div>

      <LoginForm />
      <div className="mt-6 text-center">
        <Link href="#" className="text-indigo-600 hover:underline text-sm">
          Esqueceu a senha?
        </Link>
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Não tem conta?{" "}
        <Link href="#" className="text-indigo-600 hover:underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
