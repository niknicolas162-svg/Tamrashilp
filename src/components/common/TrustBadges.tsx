'use client';

import React from 'react';
import { Hammer, ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export const TrustBadges: React.FC = () => {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Hammer,
      title: t('badgeHandmade'),
      desc: t('badgeHandmadeSub'),
    },
    {
      icon: ShieldCheck,
      title: t('badgePurity'),
      desc: t('badgePuritySub'),
    },
    {
      icon: Truck,
      title: t('badgeFreeShipping'),
      desc: t('badgeFreeShippingSub'),
    },
    {
      icon: RotateCcw,
      title: t('badgeEasyReturns'),
      desc: t('badgeEasyReturnsSub'),
    },
    {
      icon: HeartHandshake,
      title: t('badgeFairTrade'),
      desc: t('badgeFairTradeSub'),
    },
  ];

  return (
    <div className="bg-patina-900 border-y border-brass-600/25 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 text-ivory">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-patina-800/60 border border-brass-600/30 shadow-sm transition-all ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-patina-950 border border-brass-500/40 flex items-center justify-center text-brass-400 mb-2 sm:mb-3">
                <Icon className="w-4 h-4 text-brass-400" />
              </div>
              <h4 className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-ivory">
                {badge.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-parchment-400 font-body mt-1 leading-snug line-clamp-2">
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
