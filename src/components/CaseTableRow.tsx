'use client';

import { useRouter } from 'next/navigation';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CaseStatusBadge } from '@/components/CaseStatusBadge';
import type { Case } from '@/types';

interface CaseTableRowProps {
  caseItem: Case;
}

export function CaseTableRow({ caseItem }: CaseTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/cases/${caseItem.id}`);
  };

  return (
    <TableRow key={caseItem.id} className="cursor-pointer" onClick={handleRowClick}>
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
        <Badge variant={caseItem.caseDetails.urgency === 'alta' ? 'destructive' : 'secondary'}>
          {caseItem.caseDetails.urgency}
        </Badge>
      </TableCell>
      <TableCell>
        <CaseStatusBadge status={caseItem.lawyerDecision.status} />
      </TableCell>
      <TableCell>{new Date(caseItem.createdAt).toLocaleDateString('es-ES', { dateStyle: 'short' })}</TableCell>
      <TableCell className="text-right">
        {new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(caseItem.caseDetails.estimatedValue)}
      </TableCell>
    </TableRow>
  );
}

export function RecentCaseTableRow({ caseItem }: CaseTableRowProps) {
    const router = useRouter();
  
    const handleRowClick = () => {
      router.push(`/cases/${caseItem.id}`);
    };
  
    return (
        <TableRow key={caseItem.id} className="cursor-pointer" onClick={handleRowClick}>
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
            <Badge variant={caseItem.caseDetails.urgency === 'alta' ? 'destructive' : 'secondary'}>
                {caseItem.caseDetails.urgency}
            </Badge>
            </TableCell>
            <TableCell>
            <CaseStatusBadge status={caseItem.lawyerDecision.status} />
            </TableCell>
            <TableCell>{new Date(caseItem.createdAt).toLocaleDateString('es-ES', { dateStyle: 'short' })}</TableCell>
      </TableRow>
    );
  }
