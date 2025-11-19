import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Calendar, Home, Users } from "lucide-react";

export default function AppSidebar() {
  const role = "admin";

  const menus = [
    {  
      role: ["teacher", "admin"],
      label: "Teacher",
      items: [
        { label: "Home", icon: Home, href: "/" },
        { label: "Home", icon: Home, href: "/" },
      ],
    },
    {
      role: ["student", "admin"],
      label: "Student",
      items: [
        { label: "Home", icon: Home, href: "/" },
        { label: "Home", icon: Home, href: "/" },
      ],
    },
    {
      role: ["admin"],
      label: "Admin",
      items: [
          { label: "Home", icon: Home, href: "/" },
          { label: "Schedule", icon: Calendar, href: "/" },
          { label: "Teacher", icon: Users, href: "/" },
          { label: "Student", icon: Users, href: "/" },
          { label: "Schedule", icon: Calendar, href: "/" },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>PIC</SidebarHeader>

      <SidebarContent>
        {menus
          .filter((menu) => menu.role.includes(role)) 
          .map((menu, i) => (
            <SidebarGroup key={i}>
              <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {menu.items.map((item, j) => (
                    <SidebarMenuItem key={j}>
                      <SidebarMenuButton>
                        <item.icon /> {item.label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>
    </Sidebar>
  );
}
