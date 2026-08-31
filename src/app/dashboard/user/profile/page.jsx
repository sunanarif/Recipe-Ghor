import { auth } from '@/lib/auth';
import { Person, ShieldCheck, CrownDiamond, Check, Gear, Envelope, Picture } from '@gravity-ui/icons';
import { Card, Button } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user

  // Check if user is premium
  const isPremium = user?.plan === 'premium';

  // Fallback image handling
  const userAvatar = user?.image || 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png';

  return (
    <div className='mt-6 max-w-6xl mx-auto px-4'>
      <h1 className='text-2xl sm:text-[36px] font-bold text-slate-900 dark:text-white transition-colors'>
        My Profile
      </h1>
      <p className='text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium my-2'>
        Manage Your Account
      </p>

      {/* Equal 2-Column Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mt-4'>

        {/* Left Side: Profile Card */}
        <Card className="p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl flex flex-col justify-between transition-colors">
          <div>
            {/* Avatar Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-orange-500/20 shadow-md">
                  <Image
                    src={userAvatar}
                    alt={user?.name || 'User Avatar'}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
              </div>

              <div className="text-center sm:text-left flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                  {user?.name || 'User Name'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5 truncate">
                  <Envelope className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="truncate">{user?.email || 'user@example.com'}</span>
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {isPremium ? (
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Free
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Food Enthusiast
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1 self-center sm:self-start shrink-0"
              >
                <Gear className="w-3.5 h-3.5" />
                Edit
              </Button>
            </div>

            {/* Personal Info Grid */}
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                    <Person className="w-3.5 h-3.5 text-orange-500" />
                    Full Name
                  </label>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {user?.name || 'N/A'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                    <Envelope className="w-3.5 h-3.5 text-orange-500" />
                    Email Address
                  </label>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {user?.email || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                  <Picture className="w-3.5 h-3.5 text-orange-500" />
                  Image Url
                </label>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {user?.image || 'N/A'}
                </p>
              </div>

            </div>
          </div>
        </Card>

        {/* Right Side: Premium Card */}
        <Card className="p-6 sm:p-8 shadow-sm border border-amber-200/60 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/80 via-amber-50/30 to-orange-50/40 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 rounded-3xl flex flex-col justify-between transition-colors">
          <div>
            {/* Header Icon */}
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-400 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 mb-6">
              <CrownDiamond className="w-7 h-7" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isPremium ? 'Premium Member' : 'Upgrade to Premium'}
            </h3>

            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 mb-8">
              {isPremium
                ? 'Exclusive features are currently active.'
                : 'Unlock all exclusive recipe creation tools and perks.'}
            </p>

            {/* Feature List */}
            <ul className="space-y-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Unlimited recipe creations & uploads</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Get a Premium Badge on your profile</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Ad-free cooking & browsing experience</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            {isPremium ? (
              <form method='POST' action={'/api/subscription'}>
                <Button type='submit' className="w-full py-3.5 px-4 bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 font-bold rounded-2xl text-center flex items-center justify-center gap-2 shadow-sm">
                  <Check className="w-5 h-5 text-amber-600 dark:text-amber-400 stroke-[3]" />
                  Premium Active
                </Button>
              </form>
            ) : (
              <form method='POST' action={'/api/subscription'}>
                <Button type='submit' className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all text-sm">
                  Upgrade Now
                </Button>
              </form>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ProfilePage;