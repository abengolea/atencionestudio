'use server';

/**
 * @fileOverview Analyzes legal cases to provide lawyers with a summary,
 * strengths, weaknesses, and a success probability assessment.
 *
 * - analyzeCase - A function that handles the case analysis process.
 * - AnalyzeCaseInput - The input type for the analyzeCase function.
 * - AnalyzeCaseOutput - The return type for the analyzeCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCaseInputSchema = z.object({
  caseDetails: z
    .string()
    .describe('Detalles completos del caso legal proporcionados por el cliente.'),
});
export type AnalyzeCaseInput = z.infer<typeof AnalyzeCaseInputSchema>;

const AnalyzeCaseOutputSchema = z.object({
  summary: z.string().describe('Un breve resumen del caso legal.'),
  strengths: z.array(z.string()).describe('Fortalezas clave del caso.'),
  weaknesses: z.array(z.string()).describe('Debilidades potenciales del caso.'),
  successProbability: z
    .number()
    .min(0)
    .max(100)
    .describe('Probabilidad estimada de éxito (0-100).'),
  estimatedDuration: z
    .string()
    .describe('Duración estimada para resolver el caso.'),
  complexity: z
    .enum(['simple', 'medium', 'complex'])
    .describe('El nivel de complejidad del caso legal.'),
  recommendations: z.string().describe('Recomendaciones específicas para el abogado.'),
});
export type AnalyzeCaseOutput = z.infer<typeof AnalyzeCaseOutputSchema>;

export async function analyzeCase(input: AnalyzeCaseInput): Promise<AnalyzeCaseOutput> {
  return analyzeCaseFlow(input);
}

const analyzeCasePrompt = ai.definePrompt({
  name: 'analyzeCasePrompt',
  input: {schema: AnalyzeCaseInputSchema},
  output: {schema: AnalyzeCaseOutputSchema},
  prompt: `Eres un asistente legal experto analizando un caso para un abogado.

  Basado en los detalles proporcionados, genera un resumen, identifica fortalezas y debilidades,
  estima la probabilidad de éxito, la duración estimada, la complejidad y proporciona recomendaciones.

  Detalles del Caso: {{{caseDetails}}}

  Responde de manera profesional y concisa. Enfócate en proporcionar información útil para el abogado.
  Asegúrate de que el campo successProbability sea un número entre 0 y 100.
`,
});

const analyzeCaseFlow = ai.defineFlow(
  {
    name: 'analyzeCaseFlow',
    inputSchema: AnalyzeCaseInputSchema,
    outputSchema: AnalyzeCaseOutputSchema,
  },
  async input => {
    const {output} = await analyzeCasePrompt(input);
    return output!;
  }
);
