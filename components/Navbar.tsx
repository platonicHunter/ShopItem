"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Tag, Package } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "ဈေးကြည့်ရန်", icon: Search },
    { href: "/categories", label: "Categories", icon: Tag },
    { href: "/items", label: "Items", icon: Package },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:top-0 md:bottom-auto md:border-b md:border-t-0 z-50 transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        <div className="flex items-center gap-6 w-full justify-around md:justify-start">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-medium transition-colors ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
