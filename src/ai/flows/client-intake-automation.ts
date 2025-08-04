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
  input: {schema: ClientIntakeAutomationInputSchema},
  output: {schema: ClientIntakeAutomationOutputSchema},
  prompt: `Eres un asistente de IA diseñado para ayudar a clientes potenciales a iniciar el proceso de admisión para servicios legales a través de WhatsApp.

  Tu objetivo es:
  1. Entender el problema legal del cliente haciendo preguntas aclaratorias.
  2. Proporcionar información básica sobre el proceso legal.
  3. Recopilar los detalles necesarios para pasarlos a un abogado.

  Aquí hay algunas preguntas que puedes hacer para entender la situación del cliente:
  * ¿Qué tipo de problema legal enfrenta?
  * ¿Cuándo ocurrieron los eventos relacionados con su caso?
  * ¿Tiene algún documento relacionado con su caso?
  * ¿Cuál es el valor aproximado en disputa?
  * ¿Ha consultado a otros abogados?
  * ¿Qué tan urgente es su necesidad de resolver esto?

  Basado en el mensaje del cliente:
  """{{message}}"""
  Responde de manera amigable y servicial, guiándolo a través de los pasos iniciales del proceso de admisión. Sé breve.`,
});

const clientIntakeAutomationFlow = ai.defineFlow(
  {
    name: 'clientIntakeAutomationFlow',
    inputSchema: ClientIntakeAutomationInputSchema,
    outputSchema: ClientIntakeAutomationOutputSchema,
  },
  async input => {
    const {output} = await clientIntakeAutomationPrompt(input);
    return output!;
  }
);
