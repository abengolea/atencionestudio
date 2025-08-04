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
import { CaseStatusBadge } from '@/components/CaseStatusBadge';
import { mockCases } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CasesPage() {
  const renderCaseTable = (status: 'pending' | 'accepted' | 'rejected' | 'all') => {
    const filteredCases = status === 'all' 
      ? mockCases 
      : mockCases.filter(c => c.lawyerDecision.status === status);

    return (
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Case Type</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead className="text-right">Est. Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="cursor-pointer" onClick={() => (window.location.href = `/cases/${caseItem.id}`)}>
                  <TableCell>
                    <div className="font-medium">{caseItem.clientInfo.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {caseItem.clientInfo.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{caseItem.caseDetails.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={caseItem.caseDetails.urgency === 'high' ? 'destructive' : 'secondary'}>
                      {caseItem.caseDetails.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CaseStatusBadge status={caseItem.lawyerDecision.status} />
                  </TableCell>
                  <TableCell>{new Date(caseItem.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(caseItem.caseDetails.estimatedValue)}
                  </TableCell>
                </TableRow>
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
        <h1 className="text-3xl font-bold font-headline">Manage Cases</h1>
        <p className="text-muted-foreground">Review, accept, or reject incoming cases.</p>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search cases..." className="pl-8" />
                </div>
            </div>
        </div>
        <TabsContent value="all">{renderCaseTable('all')}</TabsContent>
        <TabsContent value="pending">{renderCaseTable('pending')}</TabsContent>
        <TabsContent value="accepted">{renderCaseTable('accepted')}</TabsContent>
        <TabsContent value="rejected">{renderCaseTable('rejected')}</TabsContent>
      </Tabs>
    </div>
  );
}
