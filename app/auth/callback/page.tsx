"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finishLogin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        router.push("/username");
      } else {
        router.push("/");
      }
    };

    finishLogin();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Signing you in...
    </div>
  );
}