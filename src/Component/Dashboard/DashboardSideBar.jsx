'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ListCheck, 
  Heart, 
  ShoppingBag, 
  Person, 
  ArrowRightFromSquare,
  LayoutHeaderCellsLarge,
  ArrowUpRightFromSquare,
  Plus
} from '@gravity-ui/icons';

const DashboardSideBar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutHeaderCellsLarge },
    { name: "Add Recipe", href: "/dashboard/user/add-recipe", icon: Plus },
    { name: "My Recipes", href: "/dashboard/recipes", icon: ListCheck },
    { name: "My Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "Purchased Recipes", href: "/dashboard/purchased", icon: ShoppingBag },
    { name: "Profile", href: "/dashboard/profile", icon: Person },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-300 flex flex-col justify-between p-4 border-r border-slate-800">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="p-2 bg-orange-500 rounded-xl text-white shadow-lg shadow-orange-500/30">
            <ListCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-none">Recipe Ghor</h2>
            <span className="text-xs text-slate-500 font-medium">User Dashboard</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-slate-800">
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <ArrowRightFromSquare className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSideBar;