'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { LayoutDashboard, Gavel, Settings, LogOut, ChevronRight, Briefcase, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { useSidebar } from '@/components/ui/sidebar';

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-sidebar-foreground">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard')}
              icon={<LayoutDashboard />}
              tooltip={{ children: 'Dashboard' }}
            >
              <Link href="/dashboard">Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/cases')} 
              icon={<Briefcase />}
              tooltip={{ children: 'Cases' }}
            >
              <Link href="/cases">Cases</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/admin')} 
              icon={<Shield />}
              tooltip={{ children: 'Admin' }}
            >
              <Link href="/admin">Admin</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/settings')} 
              icon={<Settings />}
              tooltip={{ children: 'Settings' }}
            >
              <Link href="/settings">Settings</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2 bg-sidebar-border" />
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="@lawyer" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {state === 'expanded' && (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
                        <span className="text-xs text-muted-foreground">john.doe@lawfirm.com</span>
                    </div>
                 )}
            </div>
            {state === 'expanded' && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground" asChild>
                    <Link href="/"><LogOut size={16} /></Link>
                </Button>
            )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
