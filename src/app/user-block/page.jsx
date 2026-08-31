import { CircleExclamationFill } from '@gravity-ui/icons';
import Link from 'next/link';
import React from 'react';

const UserBlockPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center bg-white">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
        <CircleExclamationFill className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Your Account Has Been Blocked
      </h1>
      <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-md">
        You no longer have access to Recipe Ghor. If you think this is a mistake, please contact our support team.
      </p>
      <Link href="/singup">
        <button className="mt-6 bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">
          Back to singup
        </button>
      </Link>
    </div>
    );
};

export default UserBlockPage;