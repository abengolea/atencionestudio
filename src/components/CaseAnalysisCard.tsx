import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import type { Case } from '@/types';

interface CaseAnalysisCardProps {
  analysis: Case['aiAnalysis'];
}

export function CaseAnalysisCard({ analysis }: CaseAnalysisCardProps) {
  const getProbabilityColor = (prob: number) => {
    if (prob < 40) return 'bg-red-500';
    if (prob < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Análisis de Caso por IA</CardTitle>
        <CardDescription>Evaluación automatizada de la viabilidad del caso.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Resumen</h4>
          <p className="text-sm text-muted-foreground">{analysis.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsUp className="text-green-500" size={18}/>Fortalezas</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsDown className="text-red-500" size={18}/>Debilidades</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {analysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
            </div>
        </div>

        <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="text-yellow-500" size={18}/>Recomendaciones</h4>
            <p className="text-sm text-muted-foreground">{analysis.recommendations}</p>
        </div>

        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-sm">Probabilidad de Éxito</h4>
                    <span className="font-bold text-sm">{analysis.successProbability}%</span>
                </div>
                <Progress value={analysis.successProbability} className="h-2 [&>div]:bg-green-500" />
            </div>
            <div className="flex justify-between text-sm">
                <div className="font-semibold">Complejidad</div>
                <Badge variant="outline">{analysis.complexity}</Badge>
            </div>
            <div className="flex justify-between text-sm">
                <div className="font-semibold">Duración Estimada</div>
                <span className="text-muted-foreground">{analysis.estimatedDuration}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
