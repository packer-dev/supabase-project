'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Calendar, Inbox, AlarmClock, BookKey } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const items = [
  {
    title: 'Storage',
    url: '/storage',
    icon: Inbox,
  },
  {
    title: 'Schema Visualizer',
    url: '/schema-visualizer',
    icon: Calendar,
  },
  {
    title: 'English course',
    url: '/english-course',
    icon: AlarmClock,
  },
  {
    title: 'Coding',
    url: '/coding',
    icon: BookKey,
  },
];

const Navbar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Navbar;
