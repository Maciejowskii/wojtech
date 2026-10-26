"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Błąd logowania");
        return;
      }
      router.push(search.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Błąd połączenia");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-surface mx-auto mt-20 max-w-md space-y-4 p-8">
      <h1 className="font-display text-2xl font-semibold text-navy">
        Panel administracyjny
      </h1>
      <p className="text-sm text-muted">
        Zaloguj się, aby zarządzać blogiem i realizacjami.
      </p>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Login</span>
        <input
          className="field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Hasło</span>
        <input
          className="field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Logowanie…" : "Zaloguj"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-mist px-4">
      <Suspense fallback={<p className="pt-20 text-center text-muted">Ładowanie…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
