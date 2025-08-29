
'use server';
import * as admin from 'firebase-admin';

// Check if the service account is available in the environment
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error(
    'CRITICAL: FIREBASE_SERVICE_ACCOUNT environment variable is not set.'
  );
  if (process.env.NODE_ENV !== 'development') {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT environment variable is not set.'
    );
  }
}

let app: admin.app.App | null = null;

function initializeFirebaseAdmin() {
  if (app) {
    return app;
  }

  if (admin.apps.length > 0) {
    app = admin.app();
    return app;
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
     throw new Error('Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT key is missing.');
  }

  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    if (serviceAccount.project_id !== 'caseclarity-hij0x') {
      throw new Error(
        `The provided service account is for the project "${serviceAccount.project_id}", but this application is configured for "caseclarity-hij0x". Please provide the correct service account key.`
      );
    }
    
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    return app;

  } catch (error: any) {
    console.error('Failed to parse or validate FIREBASE_SERVICE_ACCOUNT:', error.message);
    // Log the first few characters of the env var to help debug formatting issues without exposing secrets.
    console.error('FIREBASE_SERVICE_ACCOUNT starts with:', process.env.FIREBASE_SERVICE_ACCOUNT.substring(0, 20));
    throw new Error('Failed to initialize Firebase Admin SDK due to an invalid service account key.');
  }
}

function getDb() {
  const adminApp = initializeFirebaseAdmin();
  if (!adminApp) throw new Error('Firebase Admin App is not available.');
  return admin.firestore(adminApp);
}

function getAuth() {
  const adminApp = initializeFirebaseAdmin();
  if (!adminApp) throw new Error('Firebase Admin App is not available.');
  return admin.auth(adminApp);
}

export { getDb, getAuth };
