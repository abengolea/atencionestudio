
'use server';

/**
 * @fileOverview Generates legal drafts based on case details.
 *
 * - generateLegalDraft - A function that handles the draft generation process.
 * - GenerateLegalDraftInput - The input type for the generateLegalDraft function.
 * - GenerateLegalDraftOutput - The return type for the generateLegalDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateLegalDraftInputSchema = z.object({
  caseType: z.string().describe('El tipo de caso legal (ej. Laboral, Civil, Penal).'),
  draftType: z.enum(['carta_documento', 'contestacion_demanda', 'demanda_laboral'])
    .describe('El tipo de borrador legal a generar.'),
  caseSummary: z.string().describe('Un resumen de los hechos clave y el estado actual del caso.'),
  clientName: z.string().describe('Nombre del cliente.'),
  opponentName: z.string().describe('Nombre de la contraparte.'),
});
export type GenerateLegalDraftInput = z.infer<typeof GenerateLegalDraftInputSchema>;

export const GenerateLegalDraftOutputSchema = z.object({
  draft: z.string().describe('El borrador del escrito legal generado por la IA.'),
});
export type GenerateLegalDraftOutput = z.infer<typeof GenerateLegalDraftOutputSchema>;

export async function generateLegalDraft(input: GenerateLegalDraftInput): Promise<GenerateLegalDraftOutput> {
  return generateLegalDraftFlow(input);
}

const generateLegalDraftPrompt = ai.definePrompt({
  name: 'generateLegalDraftPrompt',
  input: {schema: GenerateLegalDraftInputSchema},
  output: {schema: GenerateLegalDraftOutputSchema},
  prompt: `
Eres un asistente legal experto en derecho argentino. Tu tarea es generar un borrador de un escrito legal.
Debes utilizar un tono formal y la terminología legal apropiada para Argentina.

**Instrucciones:**
1.  Analiza la información proporcionada.
2.  Redacta un borrador del tipo de escrito solicitado.
3.  Asegúrate de que el borrador sea coherente, esté bien estructurado y siga las formalidades legales.
4.  El resultado debe ser solo el texto del borrador en formato de texto plano.

**Información del Caso:**
- **Tipo de Caso:** {{caseType}}
- **Tipo de Escrito a Generar:** {{draftType}}
- **Resumen del Caso:** {{caseSummary}}
- **Cliente:** {{clientName}}
- **Contraparte:** {{opponentName}}

Genera el borrador a continuación.
`,
});

const generateLegalDraftFlow = ai.defineFlow(
  {
    name: 'generateLegalDraftFlow',
    inputSchema: GenerateLegalDraftInputSchema,
    outputSchema: GenerateLegalDraftOutputSchema,
  },
  async (input) => {
    const {output} = await generateLegalDraftPrompt(input);
    return output!;
  }
);
