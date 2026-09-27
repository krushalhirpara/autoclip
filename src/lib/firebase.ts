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

// Safe initialization of Firebase Auth
let _authInstance: Auth | null = null;
function getFirebaseAuth(): Auth {
  if (_authInstance) return _authInstance;

  try {
    _authInstance = getAuth(app);
  } catch (err: any) {
    // In server-side SSG prerendering without an API key, prevent build crash
    if (typeof window === "undefined") {
      return {} as Auth;
    }
    throw err;
  }
  return _authInstance;
}

export const auth: Auth = typeof window !== "undefined" && firebaseConfig.apiKey
  ? getAuth(app)
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
