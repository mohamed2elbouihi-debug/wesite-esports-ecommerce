import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

export const getAdminDb = () => {
  if (!getApps().length) {
    if (!firebaseAdminConfig.projectId || !firebaseAdminConfig.clientEmail) {
      throw new Error("Firebase admin credentials are missing.");
    }
    initializeApp({
      credential: cert(firebaseAdminConfig),
    });
  }

  return getFirestore();
};
