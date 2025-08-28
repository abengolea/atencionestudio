
'use client';

import { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Terminal, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateUserCredentials, getUserCredentials } from './actions';

const judicialCredentialsSchema = z.object({
    mevUser: z.string().optional(),
    mevPassword: z.string().optional(),
    pjnUser: z.string().optional(),
    pjnPassword: z.string().optional(),
});

type JudicialCredentialsFormValues = z.infer<typeof judicialCredentialsSchema>;

function JudicialIntegrationsForm() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<JudicialCredentialsFormValues>({
        resolver: zodResolver(judicialCredentialsSchema),
        defaultValues: {
            mevUser: '',
            mevPassword: '',
            pjnUser: '',
            pjnPassword: '',
        }
    });

    useEffect(() => {
        setIsLoading(true);
        getUserCredentials().then(credentials => {
            if (credentials) {
                form.reset(credentials);
            }
        }).finally(() => setIsLoading(false));
    }, [form]);

    const onSubmit = (data: JudicialCredentialsFormValues) => {
        startTransition(async () => {
            // Filter out empty password fields so they don't overwrite existing ones
            const credentialsToSave: any = { ...data };
            if (!data.mevPassword) delete credentialsToSave.mevPassword;
            if (!data.pjnPassword) delete credentialsToSave.pjnPassword;

            const result = await updateUserCredentials(credentialsToSave);
            if (result.success) {
                toast({
                    title: 'Éxito',
                    description: result.message,
                });
                // After saving, we don't want to show the password back
                form.reset({ ...data, mevPassword: '', pjnPassword: '' });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message,
                });
            }
        });
    }
    
    if (isLoading) {
        return (
             <CardContent>
                <div className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                    <p className="ml-2 text-muted-foreground">Cargando credenciales...</p>
                </div>
            </CardContent>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle>Integraciones Judiciales</CardTitle>
                    <CardDescription>Conecta el sistema a las mesas de entradas virtuales para el monitoreo automático de expedientes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                      <ShieldCheck className="h-4 w-4 !text-blue-600" />
                      <AlertTitle className="text-blue-800 dark:text-blue-300">Almacenamiento Seguro</AlertTitle>
                      <AlertDescription className="text-blue-700 dark:text-blue-400">
                        Tus credenciales se almacenan de forma segura y nunca se exponen en el lado del cliente. Deja el campo de contraseña en blanco si no deseas actualizarla.
                      </AlertDescription>
                    </Alert>

                    {/* MEV SCBA */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">MEV - SCBA (Prov. de Buenos Aires)</h3>
                        <FormField
                            control={form.control}
                            name="mevUser"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu usuario de la MEV" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mevPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Ingresa una nueva contraseña para actualizar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* PJN */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">PJN (Poder Judicial de la Nación)</h3>
                         <FormField
                            control={form.control}
                            name="pjnUser"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CUIT/CUIL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu CUIT/CUIL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pjnPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Ingresa una nueva contraseña para actualizar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? 'Guardando...' : 'Guardar Credenciales'}
                        </Button>
                        <Button variant="outline" disabled>Probar Conexión</Button>
                    </div>
                  <p className="text-xs text-muted-foreground">Se añadirán más jurisdicciones en el futuro.</p>
                </CardFooter>
            </form>
        </Form>
    )
}


export default function SettingsPage() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/api/whatsapp`;
      setWebhookUrl(url);
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Configuración</h1>
        <p className="text-muted-foreground">Gestiona tu cuenta, integraciones y filtros de casos.</p>
      </div>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones Judiciales</TabsTrigger>
          <TabsTrigger value="filters">Filtros de Casos</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil Profesional</CardTitle>
              <CardDescription>Actualiza tu información personal y profesional.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" defaultValue="Juan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Apellido</Label>
                  <Input id="last-name" defaultValue="Pérez" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="juan.perez@bufete.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Número de Licencia</Label>
                <Input id="license" defaultValue="P1234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Especializaciones</Label>
                 <Input id="specializations" defaultValue="Civil, Familiar, Laboral" placeholder="ej. Civil, Penal"/>
                 <p className="text-sm text-muted-foreground">Lista de tus especializaciones separadas por comas.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>Integración con WhatsApp</CardTitle>
              <CardDescription>Configura tu conexión con la API de WhatsApp Business.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">ID de tu Número de Teléfono</Label>
                <Input id="whatsapp-number" placeholder="Ej: 112233445566778" />
                 <p className="text-sm text-muted-foreground">Pega aquí el ID de tu número de teléfono de la API de WhatsApp.</p>
              </div>
               <div className="space-y-2">
                <Label htmlFor="whatsapp-token">Token de Acceso</Label>
                <Input id="whatsapp-token" type="password" placeholder="Pega aquí tu token de acceso permanente"/>
              </div>
                <div className="space-y-2">
                <Label htmlFor="verify-token">Token de Verificación</Label>
                <Input id="verify-token" placeholder="Crea y pega aquí un token de verificación secreto"/>
                 <p className="text-sm text-muted-foreground">Crea una cadena de texto segura. La necesitarás para configurar el webhook.</p>
              </div>
              <Separator/>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL del Webhook</Label>
                <Input id="webhook-url" value={webhookUrl} readOnly />
                <p className="text-sm text-muted-foreground">Configura esta URL en los ajustes de tu aplicación de WhatsApp en Meta for Developers.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="whatsapp-active" defaultChecked />
                <Label htmlFor="whatsapp-active">Activar integración con WhatsApp</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Configuración de WhatsApp</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
            <Card>
                <JudicialIntegrationsForm />
            </Card>
        </TabsContent>


        <TabsContent value="filters">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Filtros de Casos</CardTitle>
              <CardDescription>Establece reglas para filtrar automáticamente los casos entrantes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="case-types">Tipos de Casos Aceptados</Label>
                <Input id="case-types" defaultValue="Divorcio, Lesiones Personales, Derecho Laboral" placeholder="ej. Divorcio, Accidente"/>
                <p className="text-sm text-muted-foreground">Lista de tipos de caso que manejas, separados por comas.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-value">Valor Mínimo del Caso</Label>
                <Input id="min-value" type="number" defaultValue="50000" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-reject" />
                <Label htmlFor="auto-reject">Rechazar automáticamente los casos que no cumplan los criterios</Label>
              </div>
              <Separator />
               <div className="space-y-2">
                <Label htmlFor="custom-questions">Preguntas Iniciales Personalizadas</Label>
                <Textarea id="custom-questions" placeholder="ej. ¿Le han ofrecido un acuerdo?" className="min-h-24"/>
                <p className="text-sm text-muted-foreground">Añade preguntas personalizadas para que la IA las haga a los clientes. Una pregunta por línea.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Filtros</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
