
'use server';
import * as admin from 'firebase-admin';

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT is not set. This is required for server-side Firebase Admin SDK operations. Please generate a service account key from your Firebase project settings and add it to your .env.local file. This warning will become an error in production.'
    );
  } else {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT environment variable is not set.'
    );
  }
}

let db: admin.firestore.Firestore | null = null;
let auth: admin.auth.Auth | null = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    // Add a check for the project ID to avoid accidental connection to the wrong project
    if (serviceAccount.project_id !== 'caseclarity-hij0x') {
        throw new Error(`The provided service account is for the project "${serviceAccount.project_id}", but this application is configured for "caseclarity-hij0x". Please provide the correct service account key.`);
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    db = admin.firestore();
    auth = admin.auth();
  } catch (error) {
    console.error('Failed to parse or validate FIREBASE_SERVICE_ACCOUNT:', error);
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Failed to initialize Firebase Admin SDK.');
    }
  }
}

// Export a getter function to ensure db and auth are initialized
function getDb() {
  if (!db) {
    if (process.env.NODE_ENV === 'development') {
      // In dev, we might not have the key, so we can return a mock or throw a more specific error
      throw new Error('Firebase Admin DB not initialized. Check your FIREBASE_SERVICE_ACCOUNT key.');
    }
    throw new Error('Firebase Admin DB is not available.');
  }
  return db;
}

function getAuth() {
  if (!auth) {
     if (process.env.NODE_ENV === 'development') {
      throw new Error('Firebase Admin Auth not initialized. Check your FIREBASE_SERVICE_ACCOUNT key.');
    }
    throw new Error('Firebase Admin Auth is not available.');
  }
  return auth;
}

export { getDb, getAuth };
