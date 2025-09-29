"use client";

import { useAuth } from "@/hooks/auth.provider";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {user ? (
        <h1 className="text-3xl font-bold text-gray-800">Olá, {user.email}!</h1>
      ) : (
        <h1 className="text-3xl font-bold text-red-600">
          Nenhum usuário conectado
        </h1>
      )}
    </div>
  );
}
