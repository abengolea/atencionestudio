import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { Logo } from '@/components/Logo';

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto w-full max-w-lg">
          <CardHeader>
            <Logo />
            <CardTitle className="text-2xl font-headline mt-4">Crea tu Cuenta</CardTitle>
            <CardDescription>Introduce tu información para crear una cuenta y empezar a filtrar casos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" placeholder="Juan" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Apellido</Label>
                  <Input id="last-name" placeholder="Pérez" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@ejemplo.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="license">Número de Licencia</Label>
                <Input id="license" placeholder="P1234567" required />
              </div>
               <div className="grid gap-2">
                  <Label htmlFor="specialization">Especialización Principal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una especialización" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="penal">Penal</SelectItem>
                      <SelectItem value="laboral">Laboral</SelectItem>
                      <SelectItem value="family">Familiar</SelectItem>
                      <SelectItem value="corporate">Corporativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Crear una cuenta</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/" className="underline">
                Inicia sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/1200x900.png"
          alt="Image"
          width="1920"
          height="1080"
          data-ai-hint="modern courthouse"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
