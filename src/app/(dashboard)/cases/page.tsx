import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CaseTableRow } from '@/components/CaseTableRow';
import { mockCases } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CasesPage() {
  const renderCaseTable = (status: 'pendiente' | 'aceptado' | 'rechazado' | 'todos') => {
    const filteredCases = status === 'todos' 
      ? mockCases 
      : mockCases.filter(c => c.lawyerDecision.status === status);

    return (
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo de Caso</TableHead>
                <TableHead>Urgencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Recepción</TableHead>
                <TableHead className="text-right">Valor Est.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem) => (
                <CaseTableRow key={caseItem.id} caseItem={caseItem} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Gestionar Casos</h1>
        <p className="text-muted-foreground">Revise, acepte o rechace los casos entrantes.</p>
      </div>
      <Tabs defaultValue="todos">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
                <TabsTrigger value="aceptado">Aceptados</TabsTrigger>
                <TabsTrigger value="rechazado">Rechazados</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar casos..." className="pl-8" />
                </div>
            </div>
        </div>
        <TabsContent value="todos">{renderCaseTable('todos')}</TabsContent>
        <TabsContent value="pendiente">{renderCaseTable('pendiente')}</TabsContent>
        <TabsContent value="aceptado">{renderCaseTable('aceptado')}</TabsContent>
        <TabsContent value="rechazado">{renderCaseTable('rechazado')}</TabsContent>
      </Tabs>
    </div>
  );
}
