import { useState, useEffect } from "react";
import type { ReactNode, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

const CORRECT_PASSWORD = "fpsmart26";

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("fpsmart_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("fpsmart_auth", "true");
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <>
        {children}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-red-600 text-white text-xs text-center py-1.5 font-medium flex items-center justify-center gap-4">
            <span>Ambiente di sviluppo</span>
            <button
              onClick={() => { sessionStorage.removeItem("fpsmart_auth"); window.location.reload(); }}
              className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold px-2 py-0.5 rounded"
            >
              Esci
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white p-8 shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <img 
              src="/images/FP%20Smart_testo.png" 
              alt="FPSMART" 
              className="h-8 w-auto mx-auto mb-4"
            />
            <h1 className="text-lg font-bold text-gray-900">Sito in fase di sviluppo</h1>
            <p className="text-sm text-gray-500 mt-2">
              Inserisci la password per accedere.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Password"
                className={`w-full border ${error ? "border-red-500" : "border-gray-300"} p-3 text-sm pr-10 focus:outline-none focus:border-primary`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-4">Password errata. Riprova.</p>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 text-sm"
            >
              Accedi
            </button>
          </form>
        </div>

        <div className="mt-6 bg-red-600 text-white p-3 text-center text-xs">
          Sito in fase di sviluppo - Accesso riservato
        </div>
      </div>
    </div>
  );
}
