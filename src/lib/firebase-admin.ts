
'use server';
import * as admin from 'firebase-admin';

// --- INSTRUCCIÓN IMPORTANTE ---
// PEGA TU CLAVE DE CUENTA DE SERVICIO DE FIREBASE AQUÍ
// Reemplaza el objeto `null` de abajo con el contenido completo de tu archivo JSON de clave de servicio.
const serviceAccount = null;
// Ejemplo:
// const serviceAccount = {
//   "type": "service_account",
//   "project_id": "tu-project-id",
//   ...
// };
// --------------------------

let app: admin.app.App | null = null;

function initializeFirebaseAdmin() {
  if (app) {
    return app;
  }

  if (admin.apps.length > 0) {
    app = admin.app();
    return app;
  }
  
  if (!serviceAccount || !serviceAccount.project_id) {
     console.error('CRITICAL: La clave de servicio (serviceAccount) no está configurada en src/lib/firebase-admin.ts.');
     // No lanzamos un error aquí para evitar que el servidor falle en bucle,
     // pero las funciones que dependan de Firebase fallarán.
     return null;
  }

  try {
    if (serviceAccount.project_id !== 'caseclarity-hij0x') {
       throw new Error(
        `La clave de servicio proporcionada es para el proyecto "${serviceAccount.project_id}", pero esta aplicación está configurada para "caseclarity-hij0x". Por favor, proporciona la clave correcta.`
      );
    }
    
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    return app;

  } catch (error: any) {
    console.error('Error al inicializar Firebase Admin SDK:', error.message);
    return null;
  }
}

function getDb() {
  const adminApp = initializeFirebaseAdmin();
  if (!adminApp) {
    console.error('Error al obtener DB: La aplicación de Firebase Admin no está inicializada.');
    throw new Error('Firebase Admin App no está disponible.');
  };
  return admin.firestore(adminApp);
}

function getAuth() {
  const adminApp = initializeFirebaseAdmin();
   if (!adminApp) {
    console.error('Error al obtener Auth: La aplicación de Firebase Admin no está inicializada.');
    throw new Error('Firebase Admin App no está disponible.');
  };
  return admin.auth(adminApp);
}

export { getDb, getAuth };
