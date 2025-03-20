import { requireAuth } from "@/action/users";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { DashboardSidebar } from "@/components/sidebar/app-sidebar";
import BreadcrumbHeader from "@/components/sidebar/BreadcrumbHeader";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <DashboardSidebar isCollapsed={false} />

        <div className="flex flex-col flex-1 min-h-screen">
          <header className="flex items-center px-2 py-4 h-[50px] container bg-secondary/20">
            <SidebarTrigger className="" />
            <ThemeToggle />
            <BreadcrumbHeader />
          </header>
          <Separator />

          <div className="flex-1 container py-4">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
