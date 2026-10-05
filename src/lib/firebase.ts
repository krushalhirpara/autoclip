import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider, Auth } from "firebase/auth";

// Firebase Web App Configuration (Project: autoclipp, Project ID: autoclipp-d9e1d)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "autoclipp-d9e1d.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "autoclipp-d9e1d",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "autoclipp-d9e1d.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Safe initialization of Firebase App instance
function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

export const app: FirebaseApp = getFirebaseApp();

// Safe initialization of Firebase Auth with fallback when API key is unconfigured in development
let _authInstance: Auth | null = null;
function getFirebaseAuth(): Auth {
  if (_authInstance) return _authInstance;

  if (!firebaseConfig.apiKey) {
    _authInstance = {
      currentUser: null,
      app: app,
      name: "[DEFAULT]",
      config: firebaseConfig,
      onAuthStateChanged: (callback: (user: any) => void) => {
        callback(null);
        return () => {};
      },
      onIdTokenChanged: (callback: (user: any) => void) => {
        callback(null);
        return () => {};
      },
      signOut: async () => {},
    } as unknown as Auth;
    return _authInstance;
  }

  try {
    _authInstance = getAuth(app);
  } catch (err: any) {
    console.warn("Firebase Auth could not be initialized:", err?.message || err);
    _authInstance = {
      currentUser: null,
      app: app,
      name: "[DEFAULT]",
      config: firebaseConfig,
      onAuthStateChanged: (callback: (user: any) => void) => {
        callback(null);
        return () => {};
      },
      onIdTokenChanged: (callback: (user: any) => void) => {
        callback(null);
        return () => {};
      },
      signOut: async () => {},
    } as unknown as Auth;
  }
  return _authInstance;
}

export const auth: Auth = typeof window !== "undefined" && firebaseConfig.apiKey
  ? getFirebaseAuth()
  : (new Proxy({} as Auth, {
      get(target, prop, receiver) {
        const instance = getFirebaseAuth();
        const val = Reflect.get(instance, prop, receiver);
        return typeof val === "function" ? val.bind(instance) : val;
      },
    }));

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Apple Auth Provider
export const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");
