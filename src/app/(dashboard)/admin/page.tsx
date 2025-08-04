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
import { Button } from '@/components/ui/button';
import { Cpu, Database, Edit, Trash2, Users, CheckCircle, XCircle, FileText, Shield, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const mockUsers = [
  { id: 'USR001', name: 'John Doe', email: 'john.doe@lawfirm.com', role: 'Lawyer', status: 'active' },
  { id: 'USR002', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin', status: 'active' },
  { id: 'USR003', name: 'Peter Jones', email: 'peter.jones@lawfirm.com', role: 'Paralegal', status: 'inactive' },
  { id: 'USR004', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Client', status: 'active' },
  { id: 'USR005', name: 'Bob Williams', email: 'bob.w@example.com', role: 'Client', status: 'locked' },
];

const systemStatus = [
    { name: 'API Service', status: 'Operational', icon: <Cpu className="h-5 w-5 text-green-500" /> },
    { name: 'Database Connection', status: 'Operational', icon: <Database className="h-5 w-5 text-green-500" /> },
    { name: 'WhatsApp Service', status: 'Degraded Performance', icon: <MessageSquare className="h-5 w-5 text-yellow-500" /> },
    { name: 'Email Service', status: 'Outage', icon: <XCircle className="h-5 w-5 text-red-500" /> },
];

const mockLogs = `
[2023-10-27 10:00:00] INFO: User 'jane.smith@example.com' logged in successfully.
[2023-10-27 10:01:15] INFO: Case 'CASE001' analysis complete. Success probability: 75%.
[2023-10-27 10:02:30] WARN: WhatsApp service responding slowly. Latency: 1500ms.
[2023-10-27 10:05:00] INFO: User 'john.doe@lawfirm.com' accepted case 'CASE001'.
[2023-10-27 10:10:45] ERROR: Failed to connect to email service. SMTP connection refused.
[2023-10-27 10:11:00] INFO: User 'bob.w@example.com' account locked after 5 failed login attempts.
[2023-10-27 10:15:22] INFO: New case 'CASE004' received from 'diana.p@example.com'.
[2023-10-27 10:16:00] INFO: Case 'CASE004' auto-rejected due to low estimated value ($15000).
`;

const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
        case 'active':
            return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300">Active</Badge>;
        case 'inactive':
            return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 border-gray-300">Inactive</Badge>;
        case 'locked':
            return <Badge variant="destructive">Locked</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}

const getSystemStatusColor = (status: string) => {
    switch(status) {
        case 'Operational':
            return 'text-green-500';
        case 'Degraded Performance':
            return 'text-yellow-500';
        case 'Outage':
            return 'text-red-500';
        default:
            return 'text-muted-foreground';
    }
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, settings, and monitor system health.</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users"><Users className="mr-2"/> Users</TabsTrigger>
          <TabsTrigger value="system"><Cpu className="mr-2"/> System</TabsTrigger>
          <TabsTrigger value="logs"><FileText className="mr-2"/> Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>An overview of the health of critical system components.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                {systemStatus.map(service => (
                    <Card key={service.name}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base font-medium">{service.name}</CardTitle>
                            {service.icon}
                        </CardHeader>
                        <CardContent>
                            <p className={`text-2xl font-bold ${getSystemStatusColor(service.status)}`}>{service.status}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
           <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>A real-time feed of system events and errors.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea readOnly value={mockLogs} className="h-96 bg-muted font-mono text-xs" />
            </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}