'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types';
import { AvatarStyle } from '@/components/common/AvatarIcon';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarStyle: AvatarStyle;
  artisanWorkshopName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  login: (email: string, role?: UserRole, name?: string) => void;
  loginWithPhoneOtp: (phone: string, otp: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUser: (data: Partial<AuthUser>) => void;
  setAvatarStyle: (style: AvatarStyle) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, AuthUser> = {
  CUSTOMER: {
    id: 'user-c1',
    name: 'Aaditya Rawat',
    email: 'aaditya@example.com',
    phone: '+91 98765 43210',
    role: 'CUSTOMER',
    avatarStyle: 'lota',
  },
  SELLER: {
    id: 'artisan-1',
    name: 'Devendra Kumar Tamta',
    email: 'devendra@tamrashilp.in',
    phone: '+91 94120 54321',
    role: 'SELLER',
    avatarStyle: 'hammer',
    artisanWorkshopName: 'Shree Tamreshwar Shilp Kendra, Almora',
  },
  ADMIN: {
    id: 'admin-1',
    name: 'Curator Tamtashilp',
    email: 'curator@tamrashilp.in',
    role: 'ADMIN',
    avatarStyle: 'monogram',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(DEMO_USERS.CUSTOMER);

  useEffect(() => {
    const saved = localStorage.getItem('tamtashilp_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure no old image avatar is used
        if (!parsed.avatarStyle) {
          parsed.avatarStyle = 'lota';
        }
        delete parsed.avatar;
        setUser(parsed);
      } catch {
        setUser(DEMO_USERS.CUSTOMER);
      }
    }
  }, []);

  const login = (email: string, requestedRole: UserRole = 'CUSTOMER', name?: string) => {
    const demo = DEMO_USERS[requestedRole];
    const loggedInUser: AuthUser = {
      ...demo,
      name: name || demo.name,
      email: email || demo.email,
      avatarStyle: demo.avatarStyle || 'lota',
    };
    setUser(loggedInUser);
    localStorage.setItem('tamtashilp_user', JSON.stringify(loggedInUser));
  };

  const loginWithPhoneOtp = (phone: string, otp: string) => {
    if (otp === '123456' || otp.length === 6) {
      const loggedInUser: AuthUser = {
        id: 'user-phone-' + Date.now().toString().slice(-4),
        name: 'Patron ' + phone.slice(-4),
        email: `patron_${phone.slice(-4)}@tamrashilp.in`,
        phone: phone,
        role: 'CUSTOMER',
        avatarStyle: 'lota',
      };
      setUser(loggedInUser);
      localStorage.setItem('tamtashilp_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tamtashilp_user');
  };

  const switchRole = (newRole: UserRole) => {
    const nextUser = DEMO_USERS[newRole];
    setUser(nextUser);
    localStorage.setItem('tamtashilp_user', JSON.stringify(nextUser));
  };

  const updateUser = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('tamtashilp_user', JSON.stringify(updated));
  };

  const setAvatarStyle = (style: AvatarStyle) => {
    if (!user) return;
    updateUser({ avatarStyle: style });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'CUSTOMER',
        login,
        loginWithPhoneOtp,
        logout,
        switchRole,
        updateUser,
        setAvatarStyle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
