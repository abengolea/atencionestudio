
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, CheckCircle2, AlertTriangle, Scale, Percent, Calendar, BrainCircuit } from 'lucide-react';
import type { Case, CaseAnalysis } from '@/types';
import { analyzeCase, CaseAnalysisOutput } from '@/ai/flows/ai-case-analysis';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface AiCaseAnalysisProps {
  caseData: Case;
}

export function AiCaseAnalysis({ caseData }: AiCaseAnalysisProps) {
  const [analysis, setAnalysis] = useState<CaseAnalysisOutput | null>(caseData.aiAnalysis as CaseAnalysisOutput);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeCase({
        caseType: caseData.caseDetails.type,
        caseSummary: caseData.caseDetails.description,
      });
      setAnalysis(result);
      toast({
        title: 'Análisis Completado',
        description: 'La IA ha generado un nuevo análisis del caso.',
      });
    } catch (error) {
      console.error('Error analyzing case:', error);
      toast({
        variant: 'destructive',
        title: 'Error de IA',
        description: 'No se pudo generar el análisis. Por favor, intente de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingSkeleton = () => (
    <div className="space-y-6 p-2">
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-20 w-full" />
      <Separator />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5 mt-2" />
        </div>
        <div>
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5 mt-2" />
        </div>
      </div>
       <Separator />
       <Skeleton className="h-5 w-1/4 mb-2" />
       <Skeleton className="h-16 w-full" />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline flex items-center gap-2">
                    Análisis de IA
                </CardTitle>
                <CardDescription>Evaluación estratégica del caso generada por IA.</CardDescription>
            </div>
            <Button onClick={handleRunAnalysis} disabled={isLoading} variant="outline" size="sm">
                <BrainCircuit className="mr-2" size={16}/>
                {isLoading ? 'Analizando...' : 'Volver a Analizar'}
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? renderLoadingSkeleton() : !analysis ? (
             <div className="text-center text-muted-foreground py-12">
                <p>No hay análisis disponible para este caso.</p>
                <p>Haga clic en "Volver a Analizar" para generar uno.</p>
            </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                <Lightbulb size={18} />
                Resumen del Caso
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                  <CheckCircle2 size={18} />
                  Fortalezas
                </h4>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                  <AlertTriangle size={18} />
                  Debilidades
                </h4>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  {analysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>

            <Separator />

             <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <Scale size={18} />
                  Recomendaciones
                </h4>
                <p className="text-sm text-muted-foreground">{analysis.recommendations}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground"><Percent size={14} /> Prob. de Éxito</div>
                    <div className="text-2xl font-bold text-primary">{analysis.successProbability}%</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground"><Calendar size={14} /> Duración Est.</div>
                    <div className="text-lg font-semibold">{analysis.estimatedDuration}</div>
                </div>
                 <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground"><BrainCircuit size={14} /> Complejidad</div>
                    <div className="text-lg font-semibold capitalize">
                        <Badge variant={analysis.complexity === 'compleja' ? 'destructive' : analysis.complexity === 'media' ? 'secondary' : 'outline'}>
                            {analysis.complexity}
                        </Badge>
                    </div>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
