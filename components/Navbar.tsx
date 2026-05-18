"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X, Home, Trophy, Ticket, Sparkles, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Leaderboards", href: "/leaderboard", icon: Trophy },
    { name: "Receipts", href: "/receipts", icon: Ticket },
    { name: "AI Analyst", href: "/ai-analyst", icon: Sparkles },
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
            <span>CineWars</span>
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

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center">
            <button className="group relative flex items-center space-x-2 overflow-hidden rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white border border-neutral-800 transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              <LogIn className="z-10 w-4 h-4 text-orange-500" />
              <span className="z-10">Access Vault</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-neutral-400 bg-neutral-900/50 border border-neutral-800/80 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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