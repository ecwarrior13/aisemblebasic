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
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider defaultOpen={false}>
        <DashboardSidebar isCollapsed={false} />

        <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
          <header className="flex items-center px-4 py-2 h-[60px] bg-secondary/20 sticky top-0 z-10">
            <div className="flex items-center gap-4 w-full">
              <SidebarTrigger />

              <ThemeToggle />

              <BreadcrumbHeader />
            </div>
          </header>
          <Separator />

          <div className="flex-1 overflow-auto py-4 px-4">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
