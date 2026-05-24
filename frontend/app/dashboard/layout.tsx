import React from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/lib/modules/user/user.actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar user={user} />
      <SidebarInset className="overflow-hidden">
        <main className="mx-auto flex w-full flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
