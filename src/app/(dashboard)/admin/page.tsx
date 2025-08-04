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
  { id: 'USR001', name: 'Juan Pérez', email: 'juan.perez@bufete.com', role: 'Abogado', status: 'activo' },
  { id: 'USR002', name: 'Ana Gómez', email: 'ana.gomez@ejemplo.com', role: 'Admin', status: 'activo' },
  { id: 'USR003', name: 'Pedro Ramírez', email: 'pedro.ramirez@bufete.com', role: 'Asistente Legal', status: 'inactivo' },
  { id: 'USR004', name: 'Luisa Fernández', email: 'luisa.f@ejemplo.com', role: 'Cliente', status: 'activo' },
  { id: 'USR005', name: 'Carlos Torres', email: 'carlos.t@ejemplo.com', role: 'Cliente', status: 'bloqueado' },
];

const systemStatus = [
    { name: 'Servicio de API', status: 'Operacional', icon: <Cpu className="h-5 w-5 text-green-500" /> },
    { name: 'Conexión a Base de Datos', status: 'Operacional', icon: <Database className="h-5 w-5 text-green-500" /> },
    { name: 'Servicio de WhatsApp', status: 'Rendimiento Degradado', icon: <MessageSquare className="h-5 w-5 text-yellow-500" /> },
    { name: 'Servicio de Email', status: 'Interrupción', icon: <XCircle className="h-5 w-5 text-red-500" /> },
];

const mockLogs = `
[2023-10-27 10:00:00] INFO: Usuario 'ana.gomez@ejemplo.com' inició sesión correctamente.
[2023-10-27 10:01:15] INFO: Análisis del caso 'CASO001' completado. Probabilidad de éxito: 75%.
[2023-10-27 10:02:30] WARN: El servicio de WhatsApp responde lentamente. Latencia: 1500ms.
[2023-10-27 10:05:00] INFO: Usuario 'juan.perez@bufete.com' aceptó el caso 'CASO001'.
[2023-10-27 10:10:45] ERROR: No se pudo conectar al servicio de email. Conexión SMTP rechazada.
[2023-10-27 10:11:00] INFO: Cuenta del usuario 'carlos.t@ejemplo.com' bloqueada tras 5 intentos de inicio de sesión fallidos.
[2023-10-27 10:15:22] INFO: Nuevo caso 'CASO004' recibido de 'diana.p@ejemplo.com'.
[2023-10-27 10:16:00] INFO: Caso 'CASO004' rechazado automáticamente por bajo valor estimado ($15000).
`;

const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
        case 'activo':
            return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300">Activo</Badge>;
        case 'inactivo':
            return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 border-gray-300">Inactivo</Badge>;
        case 'bloqueado':
            return <Badge variant="destructive">Bloqueado</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}

const getSystemStatusColor = (status: string) => {
    switch(status) {
        case 'Operacional':
            return 'text-green-500';
        case 'Rendimiento Degradado':
            return 'text-yellow-500';
        case 'Interrupción':
            return 'text-red-500';
        default:
            return 'text-muted-foreground';
    }
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona usuarios, configuraciones y monitorea la salud del sistema.</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users"><Users className="mr-2"/> Usuarios</TabsTrigger>
          <TabsTrigger value="system"><Cpu className="mr-2"/> Sistema</TabsTrigger>
          <TabsTrigger value="logs"><FileText className="mr-2"/> Registros</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Ver y gestionar todos los usuarios en el sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
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
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Un resumen de la salud de los componentes críticos del sistema.</CardDescription>
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
              <CardTitle>Registros del Sistema</CardTitle>
              <CardDescription>Un feed en tiempo real de eventos y errores del sistema.</CardDescription>
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
