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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Configuración</h1>
        <p className="text-muted-foreground">Gestiona tu cuenta y la configuración de filtros de casos.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
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
                <Label htmlFor="whatsapp-number">Número de WhatsApp Business</Label>
                <Input id="whatsapp-number" defaultValue="+1-555-123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL del Webhook</Label>
                <Input id="webhook-url" defaultValue="https://api.caseclarity.com/webhook/abogado1" readOnly />
                <p className="text-sm text-muted-foreground">Configura esta URL en los ajustes de tu cuenta de WhatsApp Business.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="whatsapp-active" defaultChecked />
                <Label htmlFor="whatsapp-active">Activar integración con WhatsApp</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Configuración</Button>
            </CardFooter>
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
