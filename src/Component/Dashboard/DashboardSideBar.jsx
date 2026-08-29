'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ListCheck,
  Heart,
  ShoppingBag,
  Person,
  ArrowRightFromSquare,
  LayoutHeaderCellsLarge,
  Plus,
  Bars,
  XmarkShapeFill,
  PersonFill,
  ChartPie
} from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { GiCookingPot } from 'react-icons/gi';
import { PiChalkboardSimpleDuotone } from 'react-icons/pi';

const DashboardSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()

  const user = session?.user

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dashboardItems = {
    user: [
      { name: 'Overview', href: '/dashboard/user/overview', icon: LayoutHeaderCellsLarge },
      { name: 'Add Recipe', href: '/dashboard/user/add-recipe', icon: Plus },
      { name: 'My Recipes', href: '/dashboard/user/my-recipe', icon: ListCheck },
      { name: 'My Favorites', href: '/dashboard/user/my-favorites', icon: Heart },
      { name: 'Purchased Recipes', href: '/dashboard/user/my-purchase', icon: ShoppingBag },
      { name: 'Profile', href: '/dashboard/user/profile', icon: Person },
    ],
    admin: [
      { name: 'Overview', href: '/dashboard/admin/overview', icon: LayoutHeaderCellsLarge },
      { name: 'MANAGE USERS', href: '/dashboard/admin/manage-user', icon: PersonFill },
      { name: 'MANAGE RECIPES', href: '/dashboard/admin/manage-recipe', icon: GiCookingPot },
      { name: 'RECIPE REPORTS', href: '/dashboard/admin/my-favorites', icon: ChartPie },
      { name: 'TRANSACTIONS Recipes', href: '/dashboard/admin/my-purchase', icon: PiChalkboardSimpleDuotone },

    ]
  }


  const role = user?.role || 'user';
  const navLinks = dashboardItems[role];

  return (
    <div>

      <div className="lg:hidden flex items-center justify-between bg-slate-900 text-white p-4 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-orange-500 rounded-lg text-white">
            <ListCheck className="h-5 w-5" />
          </div>
          <h2 className="font-bold text-lg">Recipe Ghor</h2>
        </div>
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Dashboard Menu"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? <XmarkShapeFill className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
        </button>
      </div>

      {/* Backdrop for Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:min-h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between px-3 py-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-xl text-white shadow-lg shadow-orange-500/30">
                <ListCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg leading-none">Recipe Ghor</h2>
                <span className="text-xs text-slate-500 font-medium">User Dashboard</span>
              </div>
            </div>

            {/* Mobile Close Button inside Sidebar */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <XmarkShapeFill className="h-5 w-5" />
            </button>
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
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
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
          <Link
            href={'/'}
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <ArrowRightFromSquare className="h-5 w-5" />
            Back To Home
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSideBar;