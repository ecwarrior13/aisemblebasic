"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/Agents/AgentCard";
import { ChevronDown } from "lucide-react";
import { Agent } from "@/types/dbtypes";

interface AgentsDisplayProps {
  initialAgents: Agent[];
}

export default function AgentsDisplay({ initialAgents }: AgentsDisplayProps) {
  const [agents] = useState(initialAgents);
  const [visibleAgents, setVisibleAgents] = useState(agents.slice(0, 4));
  const [hasMore, setHasMore] = useState(agents.length > 4);

  const loadMore = () => {
    const currentLength = visibleAgents.length;
    const newVisibleAgents = agents.slice(0, currentLength + 4);
    setVisibleAgents(newVisibleAgents);
    setHasMore(newVisibleAgents.length < agents.length);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleAgents.map((agent) => (
          <AgentCard key={agent._id} agent={agent} />
        ))}
      </div>
      {hasMore && (
        <Button
          variant="outline"
          onClick={loadMore}
          className="mt-4 mx-auto flex items-center gap-2"
        >
          Load More <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
