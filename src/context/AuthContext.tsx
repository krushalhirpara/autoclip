"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string;
  firebaseUid?: string | null;
  fullName: string | null;
  name?: string | null;
  email: string;
  mobileNumber?: string | null;
  photoURL?: string | null;
  image?: string | null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  credits?: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isProfileComplete: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<UserProfile | null>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isProfileComplete: false,
  logout: async () => {},
  refreshProfile: async () => null,
  setProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async (): Promise<UserProfile | null> => {
    try {
      const res = await fetch("/api/v1/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const loadedProfile: UserProfile = {
            id: data.user.id,
            firebaseUid: data.user.firebaseUid,
            fullName: data.user.fullName || data.user.name || null,
            name: data.user.name || data.user.fullName || null,
            email: data.user.email,
            mobileNumber: data.user.mobileNumber || null,
            photoURL: data.user.photoURL || data.user.image || null,
            image: data.user.image || data.user.photoURL || null,
            role: data.user.role,
            createdAt: data.user.createdAt,
            credits: data.user.credits,
          };
          setProfile(loadedProfile);
          return loadedProfile;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch application user profile:", err);
    }
    return null;
  }, []);

  const refreshProfile = useCallback(async (): Promise<UserProfile | null> => {
    return await fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const fetched = await fetchProfile();
        // If profile was not found yet from backend session cookie, we provide minimal fallback
        if (!fetched) {
          setProfile({
            id: currentUser.uid,
            firebaseUid: currentUser.uid,
            fullName: currentUser.displayName || null,
            name: currentUser.displayName || null,
            email: currentUser.email || "",
            mobileNumber: null,
            photoURL: currentUser.photoURL || null,
            image: currentUser.photoURL || null,
          });
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchProfile]);

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error("Firebase signOut error:", err);
    }

    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Backend session clear error:", err);
    }

    setUser(null);
    setProfile(null);
    setLoading(false);
    router.push("/login");
    router.refresh();
  };

  const isProfileComplete = Boolean(
    profile && profile.fullName && profile.mobileNumber
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isProfileComplete,
        logout,
        refreshProfile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
