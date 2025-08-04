// src/ai/flows/client-intake-automation.ts
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
  message: z.string().describe('The client\s message via WhatsApp.'),
});
export type ClientIntakeAutomationInput = z.infer<typeof ClientIntakeAutomationInputSchema>;

const ClientIntakeAutomationOutputSchema = z.object({
  response: z.string().describe('The AI assistant\s response to the client.'),
});
export type ClientIntakeAutomationOutput = z.infer<typeof ClientIntakeAutomationOutputSchema>;

export async function clientIntakeAutomation(input: ClientIntakeAutomationInput): Promise<ClientIntakeAutomationOutput> {
  return clientIntakeAutomationFlow(input);
}

const clientIntakeAutomationPrompt = ai.definePrompt({
  name: 'clientIntakeAutomationPrompt',
  input: {schema: ClientIntakeAutomationInputSchema},
  output: {schema: ClientIntakeAutomationOutputSchema},
  prompt: `You are an AI assistant designed to help potential clients start the intake process for legal services via WhatsApp.

  Your goal is to:
  1.  Understand the client's legal issue by asking clarifying questions.
  2.  Provide basic information about the legal process.
  3.  Collect necessary details to pass on to a lawyer.

  Here are some questions you can ask to understand the client's situation:
  *   What type of legal problem are you facing?
  *   When did the events related to your case occur?
  *   Do you have any documents related to your case?
  *   What is the approximate value in dispute?
  *   Have you consulted with other lawyers?
  *   How urgent is your need to resolve this?

  Based on the client's message:
  """{{message}}"""
  Respond in a friendly and helpful manner, guiding them through the initial steps of the intake process.  Be brief.`, 
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
