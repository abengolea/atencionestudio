
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Copy } from 'lucide-react';
import type { Case } from '@/types';
import { generateLegalDraft, GenerateLegalDraftInput } from '@/ai/flows/generate-legal-draft';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface LegalDraftGeneratorProps {
  caseData: Case;
}

type DraftType = GenerateLegalDraftInput['draftType'];

export function LegalDraftGenerator({ caseData }: LegalDraftGeneratorProps) {
  const [draftType, setDraftType] = useState<DraftType | ''>('');
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateDraft = async () => {
    if (!draftType) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Por favor, seleccione un tipo de escrito.",
        });
      return;
    }
    setIsLoading(true);
    setGeneratedDraft('');

    try {
      const result = await generateLegalDraft({
        draftType: draftType,
        caseType: caseData.caseDetails.type,
        caseSummary: caseData.caseDetails.description,
        clientName: caseData.clientInfo.name,
        opponentName: 'la contraparte', // Placeholder, could be improved
      });
      setGeneratedDraft(result.draft);
    } catch (error) {
        console.error('Error generating draft:', error);
        toast({
            variant: "destructive",
            title: "Error de IA",
            description: "No se pudo generar el borrador. Por favor, intente de nuevo.",
        });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    toast({
        title: "Copiado",
        description: "El borrador ha sido copiado al portapapeles.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 /> Asistente de Redacción IA
        </CardTitle>
        <CardDescription>Genere borradores de escritos legales utilizando la información del caso.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="text-sm font-medium">Tipo de Escrito</label>
            <Select onValueChange={(value) => setDraftType(value as DraftType)} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un tipo de escrito..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carta_documento">Carta Documento</SelectItem>
                <SelectItem value="contestacion_demanda">Contestación de Demanda</SelectItem>
                <SelectItem value="demanda_laboral">Demanda Laboral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerateDraft} disabled={isLoading || !draftType}>
            {isLoading ? 'Generando...' : 'Generar Borrador'}
          </Button>
        </div>

        <div className="relative">
          <Textarea
            value={generatedDraft}
            readOnly
            placeholder="El borrador generado por la IA aparecerá aquí..."
            className="min-h-96 pr-12"
          />
          {generatedDraft && (
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                <Copy size={16} />
              </Button>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 p-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
