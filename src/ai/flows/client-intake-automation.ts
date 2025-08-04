'use server';

/**
 * @fileOverview An AI assistant for automating the client intake process via WhatsApp.
 *
 * - clientIntakeAutomation - A function that handles the client intake process.
 * - ClientIntakeAutomationInput - The input type for the clientIntakeAutomation function.
 * - ClientIntakeAutomationOutput - The return type for the clientIntakeAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClientIntakeAutomationInputSchema = z.object({
  message: z.string().describe('El mensaje del cliente a través de WhatsApp.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('El historial de la conversación actual.'),
});
export type ClientIntakeAutomationInput = z.infer<typeof ClientIntakeAutomationInputSchema>;

const ClientIntakeAutomationOutputSchema = z.object({
  response: z.string().describe('La respuesta del asistente de IA al cliente.'),
});
export type ClientIntakeAutomationOutput = z.infer<typeof ClientIntakeAutomationOutputSchema>;

export async function clientIntakeAutomation(input: ClientIntakeAutomationInput): Promise<ClientIntakeAutomationOutput> {
  return clientIntakeAutomationFlow(input);
}

const clientIntakeAutomationPrompt = ai.definePrompt({
  name: 'clientIntakeAutomationPrompt',
  input: {schema: z.object({
    message: ClientIntakeAutomationInputSchema.shape.message,
    formattedHistory: z.string().optional(),
  })},
  output: {schema: ClientIntakeAutomationOutputSchema},
  prompt: `Eres un asistente legal IA para el estudio "CaseClarity". Tu misión es realizar el intake inicial de clientes por WhatsApp.

OBJETIVO:
Mantener una conversación natural y amigable para recopilar la información esencial de un caso legal y determinar si se debe escalar a un abogado.

FLUJO DE CONVERSACIÓN:

ETAPA 1: SALUDO INICIAL
- Si no hay historial de conversación, preséntate: "Hola, soy el asistente legal de CaseClarity. Estoy aquí para ayudarte a organizar la información de tu caso para que nuestros abogados puedan atenderte de la mejor manera. ¿Podrías contarme brevemente cuál es tu situación legal?"
- Si ya hay historial, continúa la conversación de forma natural.

ETAPA 2: RECOPILACIÓN INTELIGENTE DE INFORMACIÓN
- Tu tarea es identificar el área legal (Civil, Penal, Laboral, Familiar) y hacer preguntas inteligentes y contextuales para obtener los detalles clave.
- No uses un formulario rígido. Adapta tus preguntas a la información que el cliente proporciona.
- Usa un lenguaje claro y comprensible.

PREGUNTAS GUÍA POR ÁREA (NO LAS HAGAS TODAS A LA VEZ):

**DERECHO CIVIL (contratos, daños, propiedad):**
- ¿Quiénes son las partes involucradas?
- ¿Cuándo ocurrieron los hechos importantes?
- ¿Tienes algún contrato o documento relevante?
- ¿Cuál es el valor estimado del conflicto?

**DERECHO PENAL (delitos, denuncias):**
- ¿De qué tipo de delito se trata?
- ¿Ya se ha presentado una denuncia formal?
- ¿En qué etapa se encuentra el proceso? (Ej: investigación, juicio)
- ¿Hay alguna medida urgente, como una detención?

**DERECHO LABORAL (despidos, condiciones):**
- ¿Cuál es el problema laboral? (Ej: despido, falta de pago)
- ¿Cuánto tiempo trabajaste en esa empresa?
- ¿Te dieron una razón específica para el despido?
- ¿Has firmado algún documento al finalizar la relación laboral?

**DERECHO DE FAMILIA (divorcio, custodia, alimentos):**
- ¿Qué tipo de proceso necesitas? (Ej: divorcio, custodia)
- ¿Hay menores de edad involucrados?
- ¿Existen bienes en común que deban dividirse?
- ¿Hay alguna situación de urgencia, como violencia?

EJEMPLOS DE INTERACCIÓN INTELIGENTE:
- Si el cliente dice: "me despidieron" -> IA responde: "Entiendo. Para poder ayudarte mejor, ¿podrías decirme hace cuánto tiempo trabajabas allí y si te dieron alguna razón para el despido?"
- Si el cliente dice: "choqué con mi auto" -> IA responde: "Lamento oír eso. ¿Están todos bien? Para entender la situación, ¿podrías contarme cuándo fue el accidente y si se hizo una denuncia policial?"

TONO Y ESTILO:
- Empático, profesional y tranquilizador.
- Mantén las respuestas cortas y directas, ideales para WhatsApp.
- Al final de cada respuesta, haz una pregunta clara para guiar al cliente.

HISTORIAL DE CONVERSACIÓN:
{{{formattedHistory}}}

MENSAJE ACTUAL DEL CLIENTE:
"{{message}}"

Basado en todo el contexto, genera la siguiente respuesta al cliente.
`,
});

const clientIntakeAutomationFlow = ai.defineFlow(
  {
    name: 'clientIntakeAutomationFlow',
    inputSchema: ClientIntakeAutomationInputSchema,
    outputSchema: ClientIntakeAutomationOutputSchema,
  },
  async (input) => {
    // Build the prompt history for the model
    const history = (input.conversationHistory || []).map(entry => ({
      role: entry.role,
      content: [{text: entry.content}],
    }));

    // Format the history for the prompt template
    const formattedHistory = (input.conversationHistory || [])
      .map(entry => {
        if (entry.role === 'user') {
          return `Cliente: ${entry.content}`;
        }
        return `Tú: ${entry.content}`;
      })
      .join('\n');

    const {output} = await clientIntakeAutomationPrompt({
        message: input.message,
        formattedHistory,
    }, {history});

    return output!;
  }
);
