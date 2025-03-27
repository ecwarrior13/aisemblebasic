import { fetchAgentsbyUser } from "@/action/Agents/agentActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { waitFor } from "@/lib/waitFor";
import { PlusIcon, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Agent } from "../../../types/dbtypes";

export default async function UserAgents() {
  await waitFor(5000);
  const { success, agents, error } = await fetchAgentsbyUser();
  console.log("success", success);
  console.log("agents", agents);

  return (
    <div className="container mx-auto py-8">
      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      {success && agents && agents.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">
            You do not have any agents yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Create your first AI agent to start building your virtual assistant.
          </p>
          <Link href="/dashboard/create-agent">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Your First Agent
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: Agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
function AgentCard({ agent }: { agent: Agent }) {
  const { _id, name, description, modelId, isActive } = agent;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="font-medium text-lg text-primary">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription className="text-xs">
              Model: {modelId}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description || "No description provided."}
        </p>
        <div className="mt-3">
          <span
            className={`text-xs px-2 py-1 rounded-full ${isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <Link href={`/dashboard/agents/${_id}/chat`}>
          <Button variant="default">Chat</Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/agents/${_id}/edit`}>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
          {/* <DeleteAgentButton agentId={_id} /> */}
        </div>
      </CardFooter>
    </Card>
  );
}
