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
    .describe('Comprehensive details of the legal case provided by the client.'),
});
export type AnalyzeCaseInput = z.infer<typeof AnalyzeCaseInputSchema>;

const AnalyzeCaseOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the legal case.'),
  strengths: z.array(z.string()).describe('Key strengths of the case.'),
  weaknesses: z.array(z.string()).describe('Potential weaknesses of the case.'),
  successProbability: z
    .number()
    .min(0)
    .max(100)
    .describe('Estimated probability of success (0-100).'),
  estimatedDuration: z
    .string()
    .describe('Estimated duration for resolving the case.'),
  complexity: z
    .enum(['simple', 'medium', 'complex'])
    .describe('The complexity level of the legal case.'),
  recommendations: z.string().describe('Specific recommendations for the lawyer.'),
});
export type AnalyzeCaseOutput = z.infer<typeof AnalyzeCaseOutputSchema>;

export async function analyzeCase(input: AnalyzeCaseInput): Promise<AnalyzeCaseOutput> {
  return analyzeCaseFlow(input);
}

const analyzeCasePrompt = ai.definePrompt({
  name: 'analyzeCasePrompt',
  input: {schema: AnalyzeCaseInputSchema},
  output: {schema: AnalyzeCaseOutputSchema},
  prompt: `You are an expert legal assistant analyzing a legal case for a lawyer.

  Based on the details provided, generate a summary, identify strengths and weaknesses,
  estimate the probability of success, the estimated duration, the complexity, and provide recommendations.

  Case Details: {{{caseDetails}}}

  Respond in a professional and concise manner. Focus on providing actionable insights for the lawyer.
  Ensure that the successProbability field is a number between 0 and 100.
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
