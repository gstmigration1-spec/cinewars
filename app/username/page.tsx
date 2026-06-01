"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UsernamePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveUsername = async () => {
    if (!username.trim()) {
      alert("Enter a username");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const { data: existing } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .maybeSingle();

    if (existing) {
      alert("Username already taken");
      setLoading(false);
      return;
    }

    const { error } = await supabase
  .from("profiles")
  .upsert({
    id: user.id,
    username,
  });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
        <h1 className="text-3xl font-bold text-white mb-2">
          Choose Your CineWars Username
        </h1>

        <p className="text-neutral-400 mb-6">
          This name will appear on debates, rankings and profiles.
        </p>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="MovieMafia"
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 outline-none"
        />

        <button
          onClick={saveUsername}
          disabled={loading}
          className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}