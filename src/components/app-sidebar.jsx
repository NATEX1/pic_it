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
import { BookCopy, Calendar, Home, SquareUser, Users, GraduationCap, UserCog, School, Book, Table, GraduationCapIcon, UserCogIcon, SchoolIcon, Codepen  } from "lucide-react";
import Link from "next/link";

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
          { label: "หน้าหลัก", icon: Home, href: "/home" },
          { label: "นักเรียน", icon: GraduationCapIcon, href: "/students" },
          { label: "ครู", icon: UserCogIcon, href: "/teachers" },
          { label: "แผนก", icon: SchoolIcon, href: "/departments" },
          { label: "วิชา", icon: BookCopy, href: "/subjects" },
          { label: "Schedule", icon: Calendar, href: "/schedules" },
          { label: "กลุ่มการเรียน", icon: Users , href: "/groups" },
          { label: "ห้องเรียน", icon: Codepen , href: "/classrooms" },
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
                      <SidebarMenuButton asChild>
                       <Link href={item.href}>
                        <item.icon /> {item.label}
                        </Link>
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
