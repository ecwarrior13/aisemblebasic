"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Agent, AgentWithModel } from "@/types/dbtypes";
import DeleteAgentDialog from "@/app/dashboard/_component/DeleteAgentDialog";
import { useState } from "react";
import EditAgentDialog from "@/app/dashboard/_component/EditAgentDialog";
import { useRouter } from "next/navigation";

interface AgentCardProps {
  agent: AgentWithModel;
  onLaunch?: (agent: Agent) => void;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agent: Agent) => void;
}

export default function AgentCard({ agent, onLaunch }: AgentCardProps) {
  const formattedDate = new Date(agent.createdAt).toLocaleDateString();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    if (onLaunch) {
      onLaunch(agent);
    } else {
      //Navigate to agent page
      router.push(`/agent/${agent._id}`);
    }
  };

  return (
    <>
      <DeleteAgentDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        agentName={agent.name}
        agentId={agent._id}
      />
      <EditAgentDialog
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        agentId={agent._id}
      />

      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold">
                {agent.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                {agent.modelDetails?.name || "No model selected"} -{" "}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm">
            {agent.description || "No description provided."}
          </p>
          <div className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Status:</span>
              <span
                className={agent.isActive ? "text-green-500" : "text-gray-500"}
              >
                {agent.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Created:</span>
              <span>{formattedDate}</span>
            </div>
            {agent.configuration && (
              <>
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>{agent.configuration.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Tokens:</span>
                  <span>{agent.configuration.maxTokens}</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="w-full" onClick={handleLaunch}>
            Launch
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
