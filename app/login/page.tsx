"use client";

import { useAuth } from "@/hooks/auth.provider";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Email:", email);
    console.log("Password:", password);

    // Aqui você pode chamar a função de login
    const loggeduser = await login({ email, password });
    if (loggeduser != null) {
      console.log("Login bem-sucedido:", loggeduser);
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-emerald-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-96"
      >
        <h1 className="text-2xl font-bold text-center text-emerald-950">
          Login
        </h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-950 text-white font-bold py-2 px-4 rounded hover:bg-emerald-900 transition flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}
