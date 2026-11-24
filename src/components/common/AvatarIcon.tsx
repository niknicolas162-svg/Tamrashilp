'use client';

import React from 'react';

export type AvatarStyle = 'monogram' | 'lota' | 'kalash' | 'hammer' | 'lamp' | 'bell';

export interface AvatarOption {
  id: AvatarStyle;
  label: string;
  labelHi: string;
  description: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'monogram', label: 'Atelier Monogram', labelHi: 'शिल्प मोनोग्राम', description: 'Ancestral Tamtashilp seal' },
  { id: 'lota', label: 'Copper Lota', labelHi: 'ताम्र लोटा', description: 'Classical hand-raised water vessel' },
  { id: 'kalash', label: 'Sacred Kalash', labelHi: 'पवित्र कलश', description: 'Temple sanctum ceremonial vessel' },
  { id: 'hammer', label: 'Anvil Hammer', labelHi: 'निहाई हथौड़ा', description: 'Coppersmith shaping tool' },
  { id: 'lamp', label: 'Brass Diya', labelHi: 'दीपक (दीया)', description: 'Sacred flame lamp' },
  { id: 'bell', label: 'Temple Bell', labelHi: 'मंदिर घंटी', description: 'Harmonic bronze chime' },
];

interface AvatarIconProps {
  styleName?: AvatarStyle;
  initial?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  styleName = 'monogram',
  initial,
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  const isLight = variant === 'light';
  const strokeColor = isLight ? '#8C4E28' : '#B8964F';
  const bgColor = isLight ? '#FAF4E8' : '#0B1F1C';
  const borderColor = isLight ? '#B8964F/40' : '#B8964F/60';
  const textColor = isLight ? '#2A1A12' : '#FAF4E8';

  const sizeClass = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }[size];

  // If user is signed in with an initial, render avatar circle with monogram letter in high-craft Cinzel
  if (initial) {
    return (
      <div
        className={`rounded-full border flex items-center justify-center font-display font-semibold select-none shadow-inner shrink-0 ${sizeClass} ${className}`}
        style={{
          backgroundColor: bgColor,
          borderColor: isLight ? '#B8964F' : '#B8964F',
          color: strokeColor,
        }}
        aria-label={`Avatar for ${initial}`}
      >
        <span>{initial.toUpperCase()}</span>
      </div>
    );
  }

  const renderSvgContent = () => {
    switch (styleName) {
      case 'lota':
        return (
          // Classical round-bellied copper lota
          <g stroke={strokeColor} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Rim */}
            <ellipse cx="12" cy="5" rx="5" ry="1.5" />
            {/* Neck */}
            <path d="M7.5 5.5 C7.5 8, 5 9.5, 5 14 C5 18 8 20 12 20 C16 20 19 18 19 14 C19 9.5, 16.5 8, 16.5 5.5" />
            {/* Hammer facet line */}
            <path d="M8.5 12 C10 13 14 13 15.5 12" strokeDasharray="1 2" strokeWidth="1.2" />
            <path d="M8 15 C10 16.5 14 16.5 16 15" strokeDasharray="1 2" strokeWidth="1.2" />
          </g>
        );

      case 'kalash':
        return (
          // Sacred ceremonial kalash with mango leaves and coconut
          <g stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Coconut tip */}
            <path d="M12 2 L13.5 5.5 L10.5 5.5 Z" />
            {/* Mango leaves */}
            <path d="M8.5 6 C9.5 4, 12 4.5, 12 6" />
            <path d="M15.5 6 C14.5 4, 12 4.5, 12 6" />
            {/* Kalash rim */}
            <ellipse cx="12" cy="7" rx="4.5" ry="1.2" />
            {/* Belly */}
            <path d="M8 7.5 C6 10, 5 13, 6 16 C7 19, 10 20.5, 12 20.5 C14 20.5, 17 19, 18 16 C19 13, 18 10, 16 7.5" />
            {/* Sacred band */}
            <path d="M7 14 C9 15.5 15 15.5 17 14" />
          </g>
        );

      case 'hammer':
        return (
          // Coppersmith horn-anvil hammer
          <g stroke={strokeColor} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Hammer head */}
            <path d="M7 6 L17 6 L16 10 L8 10 Z" />
            <path d="M17 6 L19 8 L16 10" />
            {/* Handle */}
            <path d="M12 10 L12 21" strokeWidth="1.8" />
            {/* Handle grip rings */}
            <path d="M10.5 17 L13.5 17" strokeWidth="1.2" />
            <path d="M10.5 19 L13.5 19" strokeWidth="1.2" />
          </g>
        );

      case 'lamp':
        return (
          // Sacred brass diya / lamp
          <g stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Flame */}
            <path d="M12 2 C13.5 4, 13.5 6, 12 7.5 C10.5 6, 10.5 4, 12 2 Z" fill={strokeColor} fillOpacity="0.2" />
            {/* Diya bowl */}
            <path d="M4 11 C4 15, 8 16.5, 12 16.5 C16 16.5, 20 15, 20 11 L16 9 C14 10, 10 10, 8 9 Z" />
            {/* Spout */}
            <path d="M12 9 L12 7.5" />
            {/* Base stand */}
            <path d="M10 16.5 L9 20 L15 20 L14 16.5" />
          </g>
        );

      case 'bell':
        return (
          // Harmonic brass temple bell (ghanti)
          <g stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Handle loop */}
            <circle cx="12" cy="4" r="2" />
            <path d="M12 6 L12 9" />
            {/* Bell dome */}
            <path d="M9 9 C9 9, 8 15, 5 17 L19 17 C16 15, 15 9, 15 9 Z" />
            {/* Clapper */}
            <circle cx="12" cy="19" r="1.5" fill={strokeColor} />
            <path d="M12 17 L12 18.5" />
          </g>
        );

      case 'monogram':
      default:
        return (
          // Refined atelier monogram (stylized T & S with anvil base)
          <g stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Anvil curve bottom */}
            <path d="M6 19 C9 17.5, 15 17.5, 18 19" />
            {/* T bar top */}
            <path d="M7 6 L17 6" />
            {/* T stem / anvil stake */}
            <path d="M12 6 L12 18" />
            {/* Interlaced S motif */}
            <path d="M14.5 9 C13 7.5, 10 8, 10 10.5 C10 13, 14 13.5, 14 15.5 C14 17.5, 11 17.5, 9.5 16" />
          </g>
        );
    }
  };

  return (
    <div
      className={`rounded-full border flex items-center justify-center p-1.5 shrink-0 transition-colors ${sizeClass} ${className}`}
      style={{
        backgroundColor: bgColor,
        borderColor: isLight ? '#B8964F' : '#B8964F/60',
      }}
      title={`Atelier motif: ${styleName}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {renderSvgContent()}
      </svg>
    </div>
  );
};

