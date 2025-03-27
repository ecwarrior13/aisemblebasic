"use client";
import { ChevronRight, Bot, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { fetchAgentsbyUser } from "@/action/Agents/agentActions";

// Interface for the agent object from Convex
interface Agent {
  _id: string;
  name: string;
  isActive: boolean;
  // Add other properties that might be needed for display
}

// Interface for the response from fetchAgentsByUser
interface AgentsResponse {
  success: boolean;
  agents: Agent[];
  error?: string;
}

export function DynamicNavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[];
  }[];
}) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        // Fetch agents from Convex database
        const response = (await fetchAgentsbyUser()) as AgentsResponse;

        if (response.success) {
          // Extract just the agents array from the response
          setAgents(response.agents);
        } else {
          console.error("Failed to fetch agents:", response.error);
          setAgents([]);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Check if this is the "Your Agents" section
          if (item.title === "Your Agents") {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {loading ? (
                        <SidebarMenuSubItem key="loading-placeholder">
                          <SidebarMenuSubButton>
                            <span>Loading agents...</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ) : agents.length > 0 ? (
                        agents.map((agent) => (
                          <SidebarMenuSubItem key={`agent-${agent._id}`}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/dashboard/agent/${agent._id}`}>
                                <Bot />
                                <span>{agent.name}</span>
                                {!agent.isActive && (
                                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                                    Inactive
                                  </span>
                                )}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      ) : (
                        <SidebarMenuSubItem key="no-agents-placeholder">
                          <SidebarMenuSubButton asChild>
                            <a href="/dashboard/create-agent">
                              <span>No agents found. Create one?</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Render other menu items normally
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
