import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
];

// Authentication and Firestore only require these three values. Keeping the
// remaining Web app values in the config supports future Firebase services.
export const isFirebaseConfigured = requiredConfig.every(
  (value) => typeof value === "string" && value.trim().length > 0,
);

export const firebaseAdminEmail =
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL?.trim().toLowerCase() ?? "";

export const isAdminEmail = (email: string | null | undefined) =>
  firebaseAdminEmail.length > 0 && email?.trim().toLowerCase() === firebaseAdminEmail;

let app: FirebaseApp | undefined;

function getFirebaseApp() {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local and restart Next.js.",
    );
  }

  app ??= getApps().length ? getApp() : initializeApp(firebaseConfig);
  return app;
}

// Initialize browser-dependent services only where they are used. This keeps
// Next.js prerendering independent from local Firebase credentials.
export const getFirebaseAuth = () => getAuth(getFirebaseApp());
export const getFirebaseDb = () => getFirestore(getFirebaseApp());
