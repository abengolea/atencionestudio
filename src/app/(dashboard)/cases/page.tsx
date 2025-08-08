
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, Query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Case } from '@/types';
import {
  Card,
  CardContent,
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
import { CaseTableRow } from '@/components/CaseTableRow';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'todos' | 'pendiente' | 'aceptado' | 'rechazado'>('todos');

  useEffect(() => {
    setIsLoading(true);
    let q: Query;
    const casesCollection = collection(db, 'cases');

    if (activeTab === 'todos') {
      q = query(casesCollection);
    } else {
      q = query(casesCollection, where('lawyerDecision.status', '==', activeTab));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const caseList = snapshot.docs.map(doc => {
         const data = doc.data();
         return {
            id: doc.id,
            ...data,
            // Convert Firestore Timestamps to JS Dates
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
         } as Case
      });
      setCases(caseList);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching cases: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [activeTab]);

  const renderCaseTable = () => {
     if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
           <p className="ml-2">Cargando casos...</p>
        </div>
      );
    }

    if (cases.length === 0) {
        return (
             <div className="flex justify-center items-center h-64">
                <p>No se encontraron casos para esta vista.</p>
            </div>
        )
    }

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
              {cases.map((caseItem) => (
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
      <Tabs 
        defaultValue="todos" 
        onValueChange={(value) => setActiveTab(value as any)}
        className="w-full"
      >
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
        <TabsContent value={activeTab} className="mt-4">
           {renderCaseTable()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
