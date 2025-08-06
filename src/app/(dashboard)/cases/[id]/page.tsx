import { notFound } from 'next/navigation';
import { mockCases } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CaseStatusBadge } from '@/components/CaseStatusBadge';
import { WhatsAppChat } from '@/components/WhatsAppChat';
import { LegalDraftGenerator } from '@/components/LegalDraftGenerator';
import { FileText, Calendar, DollarSign, User, Phone, Mail, MapPin, Check, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const caseData = mockCases.find(c => c.id === params.id);

  if (!caseData) {
    notFound();
  }

  const { clientInfo, caseDetails, aiAnalysis, lawyerDecision } = caseData;

  return (
    <div className="flex flex-col gap-8">
      <div>
          <Button variant="outline" size="sm" asChild>
              <Link href="/cases"><ArrowLeft size={16} className="mr-2"/> Volver a Casos</Link>
          </Button>
      </div>
      <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Detalles del Caso: {caseData.id}</h1>
            <p className="text-muted-foreground">
              Recibido el {new Date(caseData.createdAt).toLocaleDateString('es-ES', { dateStyle: 'long' })}
            </p>
          </div>
          <CaseStatusBadge status={lawyerDecision.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <LegalDraftGenerator caseData={caseData} />
            <WhatsAppChat caseData={caseData} />
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><User size={16} className="text-muted-foreground" /><span className="font-medium">{clientInfo.name}</span></div>
              <div className="flex items-center gap-3"><Mail size={16} className="text-muted-foreground" /><a href={`mailto:${clientInfo.email}`} className="text-primary hover:underline">{clientInfo.email}</a></div>
              <div className="flex items-center gap-3"><Phone size={16} className="text-muted-foreground" /><a href={`tel:${clientInfo.phone}`} className="text-primary hover:underline">{clientInfo.phone}</a></div>
              <div className="flex items-center gap-3"><MapPin size={16} className="text-muted-foreground" /><span>{clientInfo.location}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Resumen del Caso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tipo de Caso</span><Badge variant="secondary">{caseDetails.type}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Urgencia</span><Badge variant={caseDetails.urgency === 'alta' ? "destructive" : "outline"}>{caseDetails.urgency}</Badge></div>
                <Separator />
                <div className="flex items-center gap-3"><DollarSign size={16} className="text-muted-foreground" /><span className="font-medium">Valor Estimado: {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(caseDetails.estimatedValue)}</span></div>
                <div className="flex items-start gap-3"><Calendar size={16} className="text-muted-foreground mt-1" /><p>{caseDetails.timeline}</p></div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText size={16} />Documentos</h4>
                    <ul className="space-y-2">
                        {caseDetails.documents.map(doc => (
                            <li key={doc.name}>
                                <a href={doc.url} className="text-primary hover:underline flex items-center gap-2">
                                    <FileText size={14} /> {doc.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Decisión</CardTitle>
              <CardDescription>Registre su decisión y notas para este caso.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea placeholder="Añadir notas privadas..."/>
                <div className="flex gap-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700"><Check className="mr-2" size={16} /> Aceptar Caso</Button>
                    <Button variant="destructive" className="w-full"><X className="mr-2" size={16} /> Rechazar Caso</Button>
                </div>
            </CardContent>
           </Card>

        </div>
      </div>
    </div>
  );
}
