"use client";
import {
  Bell,
  Briefcase,
  GitBranch,
  Home,
  LogOut,
  PenTool,
  PlusSquare,
  Upload,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { NavMain } from "@/components/dashboard/nav-mian";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { env } from "@/lib/env";

const navFile = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Upload Files",
    url: "/dashboard/file/upload",
    icon: Upload,
  },
  {
    title: "Add New File",
    url: "/dashboard/file/new",
    icon: PlusSquare,
  },
  {
    title: "Git Clone",
    url: "/dashboard/file/git-clone",
    icon: GitBranch,
  },
  {
    title: "Temporary File",
    url: "/tmp",
    icon: GitBranch,
  },
];

const navPen = [
  {
    title: "Projects",
    url: "#",
    icon: Briefcase,
  },
  {
    title: "Pens",
    url: "#",
    icon: PenTool,
  },
  {
    title: "New Pen",
    url: "/dashboard/pens/edit",
    icon: PlusSquare,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];
export const DashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Logo />
                <span className="text-base font-semibold">
                  {env.NEXT_PUBLIC_SITE_NAME}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu></SidebarMenu>
        <NavMain label="Files" items={navFile} />
        <NavMain label="Pens" items={navPen} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
};
