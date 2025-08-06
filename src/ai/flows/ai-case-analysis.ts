
'use server';

/**
 * @fileOverview Analyzes a legal case and provides a detailed summary and strategic assessment.
 *
 * - analyzeCase - A function that handles the case analysis process.
 * - CaseAnalysisInput - The input type for the analyzeCase function.
 * - CaseAnalysisOutput - The return type for the analyzeCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const CaseAnalysisInputSchema = z.object({
  caseType: z.string().describe('El tipo de caso legal (ej. Laboral, Civil, Penal).'),
  caseSummary: z.string().describe('Un resumen de los hechos clave y el estado actual del caso.'),
});
export type CaseAnalysisInput = z.infer<typeof CaseAnalysisInputSchema>;

export const CaseAnalysisOutputSchema = z.object({
    summary: z.string().describe('Un resumen conciso del caso, identificando las partes y el conflicto principal.'),
    strengths: z.array(z.string()).describe('Una lista de los puntos fuertes o ventajas del caso para el cliente.'),
    weaknesses: z.array(z.string()).describe('Una lista de los puntos débiles o riesgos del caso para el cliente.'),
    recommendations: z.string().describe('Recomendaciones estratégicas y próximos pasos a seguir.'),
    successProbability: z.number().min(0).max(100).describe('La probabilidad estimada de éxito del caso, como un porcentaje de 0 a 100.'),
    estimatedDuration: z.string().describe('La duración estimada del caso en meses o años.'),
    complexity: z.enum(["simple", "media", "compleja"]).describe('La complejidad legal y procesal del caso.'),
});
export type CaseAnalysisOutput = z.infer<typeof CaseAnalysisOutputSchema>;

export async function analyzeCase(input: CaseAnalysisInput): Promise<CaseAnalysisOutput> {
  return analyzeCaseFlow(input);
}

const analyzeCasePrompt = ai.definePrompt({
  name: 'analyzeCasePrompt',
  input: {schema: CaseAnalysisInputSchema},
  output: {schema: CaseAnalysisOutputSchema},
  prompt: `
Eres un abogado senior experto en derecho argentino. Tu tarea es analizar un caso legal y proporcionar un informe estratégico completo.
Debes evaluar la información proporcionada y generar un análisis detallado, objetivo y realista.

**Instrucciones:**
1.  **Resumen:** Redacta un resumen claro y conciso del caso.
2.  **Fortalezas:** Identifica 2-3 puntos clave que favorecen la posición del cliente.
3.  **Debilidades:** Identifica 2-3 riesgos o puntos débiles potenciales en el caso.
4.  **Recomendaciones:** Propón los próximos pasos lógicos y estratégicos a seguir.
5.  **Probabilidad de Éxito:** Estima un porcentaje de éxito realista (0-100). Sé conservador y justifica tu estimación implícitamente en el análisis.
6.  **Duración Estimada:** Proporciona un rango de tiempo estimado para la resolución del caso.
7.  **Complejidad:** Clasifica la complejidad del caso como 'simple', 'media' o 'compleja'.

**Información del Caso:**
- **Tipo de Caso:** {{caseType}}
- **Resumen del Caso:** {{caseSummary}}

Genera el análisis estructurado a continuación.
`,
});

const analyzeCaseFlow = ai.defineFlow(
  {
    name: 'analyzeCaseFlow',
    inputSchema: CaseAnalysisInputSchema,
    outputSchema: CaseAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await analyzeCasePrompt(input);
    return output!;
  }
);
