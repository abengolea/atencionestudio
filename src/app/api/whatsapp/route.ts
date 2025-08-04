
import { NextRequest, NextResponse } from 'next/server';
import { clientIntakeAutomation } from '@/ai/flows/client-intake-automation';

// Interfaz para la solicitud de mensaje de WhatsApp
interface WhatsAppMessageRequest {
    object: string;
    entry: {
        id: string;
        changes: {
            value: {
                messaging_product: string;
                metadata: {
                    display_phone_number: string;
                    phone_number_id: string;
                };
                contacts: {
                    profile: {
                        name: string;
                    };
                    wa_id: string;
                }[];
                messages: {
                    from: string;
                    id: string;
                    timestamp: string;
                    text: {
                        body: string;
                    };
                    type: string;
                }[];
            };
            field: string;
        }[];
    }[];
}

// Para verificar el Webhook
export async function GET(req: NextRequest) {
    const webhookVerifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (!webhookVerifyToken) {
        console.error('Error Crítico: La variable de entorno WHATSAPP_VERIFY_TOKEN no está configurada en el servidor.');
        return new NextResponse('Error: Configuración de servidor incompleta.', { status: 500 });
    }

    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === webhookVerifyToken) {
        console.log('¡Webhook verificado exitosamente!');
        return new NextResponse(challenge, { status: 200 });
    } else {
        console.error('Fallo en la verificación del webhook. El token no coincide o el modo no es "subscribe".');
        return new NextResponse('Forbidden', { status: 403 });
    }
}

// Para recibir mensajes
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as WhatsAppMessageRequest;
        const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        
        if (message?.type === 'text') {
            const from = message.from;
            const msgBody = message.text.body;
            const lawyerName = "Equipo Legal"; 

            console.log(`Mensaje recibido de ${from}: ${msgBody}`);

            const conversationHistory: any[] = []; // TODO: Implementar historial

            const aiResponse = await clientIntakeAutomation({
                lawyerName: lawyerName,
                message: msgBody,
                conversationHistory,
            });

            await sendWhatsAppMessage(from, aiResponse.response);

            console.log(`Respuesta de IA enviada a ${from}: ${aiResponse.response}`);
        }

        return new NextResponse('OK', { status: 200 });
    } catch (error) {
        console.error('Error procesando el webhook POST:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

async function sendWhatsAppMessage(to: string, text: string) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    
    if (!phoneNumberId || !accessToken) {
        console.error("Error Crítico: Las variables de entorno de WhatsApp (PHONE_NUMBER_ID o ACCESS_TOKEN) no están configuradas.");
        // No devolvemos un error al cliente de WhatsApp, pero registramos el fallo.
        return;
    }

    const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

    const payload = {
        messaging_product: 'whatsapp',
        to: to,
        text: { body: text },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al enviar mensaje de WhatsApp: ${response.status} ${JSON.stringify(errorData)}`);
        }

        console.log('Mensaje de WhatsApp enviado exitosamente.');
    } catch (error) {
        console.error('Error en sendWhatsAppMessage:', error);
    }
}
