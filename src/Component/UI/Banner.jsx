import React from 'react';
import Image from 'next/image';
import bannerImage from '../../../public/Assests/bannerImage.jpg';

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 md:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 lg:gap-12">
        
        {/* Content Section */}
        <div className="flex flex-col items-start space-y-6 text-left">
          <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600">
            Recipe Ghor • রেসিপি ঘর
          </span>
          
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Wondering what to cook today?{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Explore Recipe Ghor
            </span>{' '}
            for the best ideas!
          </h1>
          
          <p className="text-base text-slate-600 sm:text-lg">
            Discover hundreds of delicious, easy-to-make recipes crafted to bring incredible flavors straight to your kitchen.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-400">
              Explore Recipes
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
              Today s Special
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-900/10">
            <Image
              src={bannerImage}
              alt="Delicious food display on Recipe Ghor"
              priority
              placeholder="blur"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;