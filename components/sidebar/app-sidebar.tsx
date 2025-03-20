"use client";

import { sideBarMenuItems } from "@/config/nav";
import Logo from "../Logo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isCollapsed: boolean;
}

export function DashboardSidebar({
  isCollapsed,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-secondary/20">
        <div className="flex items-center space-x-2">
          <Logo
            collapsed={isCollapsed}
            className="w-full"
            fontSize={isCollapsed ? "2xl" : "3xl"}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-secondary/20">
        <NavMain items={sideBarMenuItems.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-secondary/20">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
