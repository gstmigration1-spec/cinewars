"use client";

import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });
  };

  

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold"
      >
        Sign in with Google
      </button>

    </div>
  );
}