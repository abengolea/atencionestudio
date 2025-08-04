import { Badge } from '@/components/ui/badge';

type CaseStatus = 'pending' | 'accepted' | 'rejected';

interface CaseStatusBadgeProps {
  status: CaseStatus;
}

export function CaseStatusBadge({ status }: CaseStatusBadgeProps) {
  const statusStyles: Record<
    CaseStatus,
    { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string; text: string }
  > = {
    pending: {
      variant: 'secondary',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300',
      text: 'Pending',
    },
    accepted: {
      variant: 'secondary',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300',
      text: 'Accepted',
    },
    rejected: {
      variant: 'secondary',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300',
      text: 'Rejected',
    },
  };

  const { variant, className, text } = statusStyles[status];

  return <Badge variant={variant} className={className}>{text}</Badge>;
}
