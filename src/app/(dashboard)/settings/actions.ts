
'use server';

import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

interface Credentials {
  mevUser?: string;
  mevPassword?: string;
  pjnUser?: string;
  pjnPassword?: string;
}

export async function updateUserCredentials(credentials: Credentials) {
  try {
    // In a real scenario, you'd get the user ID from the session.
    // For this example, we'll assume a hardcoded user ID for the demo's scope.
    // This should be replaced with a proper auth check.
    const currentUserId = 'X8A9sT2f3R4eC5V6bN7mI8lO9p0'; // Replace with dynamic user ID from session
    
    if (!currentUserId) {
        throw new Error("User not authenticated.");
    }

    const userCredentialsRef = db.collection('users').doc(currentUserId).collection('credentials').doc('judicial');

    await userCredentialsRef.set(credentials, { merge: true });

    revalidatePath('/settings');
    return { success: true, message: 'Credenciales guardadas exitosamente.' };
  } catch (error) {
    console.error("Error updating credentials:", error);
    const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
    return { success: false, message: `Error al guardar: ${errorMessage}` };
  }
}

export async function getUserCredentials() {
    try {
        const currentUserId = 'X8A9sT2f3R4eC5V6bN7mI8lO9p0'; // Replace with dynamic user ID from session
        if (!currentUserId) {
            return null;
        }

        const userCredentialsRef = db.collection('users').doc(currentUserId).collection('credentials').doc('judicial');
        const doc = await userCredentialsRef.get();

        if (!doc.exists) {
            return null;
        }

        return doc.data();

    } catch (error) {
        console.error("Error fetching credentials:", error);
        return null;
    }
}
