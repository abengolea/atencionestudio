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
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and case filter settings.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="filters">Case Filters</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
              <CardDescription>Update your personal and professional information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@lawfirm.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input id="license" defaultValue="P1234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specializations</Label>
                 <Input id="specializations" defaultValue="Civil, Family Law, Laboral" placeholder="e.g. Civil, Penal"/>
                 <p className="text-sm text-muted-foreground">Comma-separated list of your specializations.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>Configure your WhatsApp Business API connection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
                <Input id="whatsapp-number" defaultValue="+1-555-123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" defaultValue="https://api.caseclarity.com/webhook/lawyer1" readOnly />
                <p className="text-sm text-muted-foreground">Set this URL in your WhatsApp Business account settings.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="whatsapp-active" defaultChecked />
                <Label htmlFor="whatsapp-active">Activate WhatsApp integration</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="filters">
          <Card>
            <CardHeader>
              <CardTitle>Case Filter Settings</CardTitle>
              <CardDescription>Set rules to automatically filter incoming cases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="case-types">Accepted Case Types</Label>
                <Input id="case-types" defaultValue="Divorce, Personal Injury, Labor Law" placeholder="e.g. Divorce, Accident"/>
                <p className="text-sm text-muted-foreground">Comma-separated list of case types you handle.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-value">Minimum Case Value</Label>
                <Input id="min-value" type="number" defaultValue="50000" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-reject" />
                <Label htmlFor="auto-reject">Automatically reject cases that do not meet the criteria</Label>
              </div>
              <Separator />
               <div className="space-y-2">
                <Label htmlFor="custom-questions">Custom Initial Questions</Label>
                <Textarea id="custom-questions" placeholder="e.g. Have you been offered a settlement?" className="min-h-24"/>
                <p className="text-sm text-muted-foreground">Add custom questions for the AI to ask clients. One question per line.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Filters</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
