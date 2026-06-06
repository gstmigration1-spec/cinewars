"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X, Home, Trophy, Ticket, Sparkles, LogIn, Film, Search } from "lucide-react";import { supabase } from "@/lib/supabase";
import { ChevronDown, LogOut, User } from "lucide-react";
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

const [movieSearch, setMovieSearch] = useState("");
const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
const [currentUser, setCurrentUser] = useState<any>(null);
const [showDropdown, setShowDropdown] = useState(false);
useEffect(() => {
  const loadUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("AUTH USER:", user);
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user!.id)
      .single();

    console.log("PROFILE DATA:", data);
    console.log("PROFILE ERROR:", error);

    if (data) {
      setCurrentUser(data);

    }
  };

  loadUser();
}, []);
useEffect(() => {
  const searchMovies = async () => {
    if (movieSearch.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const { data } = await supabase
      .from("movies")
      .select("title")
      .ilike("title", `%${movieSearch}%`)
      .limit(6);

    setSearchResults(data || []);
  };

  const timer = setTimeout(searchMovies, 300);

  return () => clearTimeout(timer);
}, [movieSearch]);
const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Leaderboards", href: "/leaderboard", icon: Trophy },
    { name: "Receipts", href: "/receipts", icon: Ticket },
    { name: "AI Analyst", href: "/ai-analyst", icon: Sparkles },
    { name: "Debates", href: "/debates", icon: Flame },
    { name: "Archive", href: "/archive", icon: Film },
    
  ];

  return (
  <nav className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2 text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-[0_2px_15px_rgba(239,68,68,0.3)]"
          >
            <Flame className="w-7 h-7 text-red-500 fill-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span>CineWars TEST123</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-1.5 px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-200 ${
                    isActive ? "text-orange-500" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
<div className="flex relative mx-4">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

    <input
      type="text"
      value={movieSearch}
      onChange={(e) => setMovieSearch(e.target.value)}
      placeholder="Search movies..."
className="w-40 md:w-64 bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500"    />

    {searchResults.length > 0 && (
      <div className="absolute top-12 left-0 w-full bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-xl z-50">
        {searchResults.map((movie) => (
  <button
    key={movie.movie_id}
onClick={() => {
  router.push(`/movies/${movie.movie_id}`);
  setMovieSearch("");
  setSearchResults([]);
}}
            className="w-full text-left px-4 py-3 hover:bg-neutral-900 text-white border-b border-neutral-900 last:border-0"
          >
            {movie.title}
          </button>
        ))}
      </div>
    )}
  </div>
</div>
         <div className="hidden md:flex items-center relative">
  {currentUser ? (
    <>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-white"
      >
        <User className="w-4 h-4" />
        <span>{currentUser.username}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-12 w-44 rounded-xl border border-neutral-800 bg-neutral-950 shadow-lg">
          <Link
  href={`/user/${currentUser.username}`}
  className="flex w-full items-center gap-2 px-4 py-3 hover:bg-neutral-900"
>
  <User className="w-4 h-4" />
  Profile
</Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-3 hover:bg-neutral-900 text-red-400"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </>
  ) : (
    <button className="group relative flex items-center space-x-2 overflow-hidden rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white border border-neutral-800">
      <LogIn className="w-4 h-4 text-orange-500" />
      <span>Join Arena</span>
    </button>
  )}
</div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden min-h-[48px] items-center">
            <button
  onClick={() => setIsOpen(!isOpen)}
  className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-orange-500 bg-black text-white shadow-[0_0_15px_rgba(249,115,22,0.35)]"
>
  {isOpen ? (
    <X className="h-7 w-7 text-white" />
  ) : (
    <Menu className="h-7 w-7 text-white" />
  )}
</button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-neutral-900 bg-neutral-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="space-y-2 px-4 py-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-black uppercase tracking-wide transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-red-950/40 to-orange-950/20 border border-red-500/30 text-orange-400 shadow-[inset_0_0_12px_rgba(239,68,68,0.1)]"
                        : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white border border-transparent"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-neutral-500"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-neutral-900 mt-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 py-3.5 text-center text-sm font-black uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(239,68,68,0.25)] hover:opacity-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Access Vault</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}