"use client"

import ChatInterface from "@/components/chat/ChatInterface"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams } from "next/navigation"

export default function AgentPage() {
  const { id } = useParams()
  // Convert the string ID to a Convex ID
  const agentId = typeof id === "string" ? (id as Id<"agents">) : Array.isArray(id) ? (id[0] as Id<"agents">) : null

  // Fetch agent data from Convex if we have a valid ID
  const agent = useQuery(api.agent.getAgentWithModel, agentId ? { id: agentId } : "skip")

  if (!agentId) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Invalid agent ID</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-2 md:px-4 h-full py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Leftside - Agent Details */}
            <div className="order-2 flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-white h-[calc(100vh-150px)] min-h-[500px]">
              <h2 className="text-lg font-semibold text-primary">Agent Details</h2>
              <div className="flex-1 overflow-y-auto">
                {agent ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.description || "No description provided."}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Model:</div>
                      <div className="font-medium">{agent.modelDetails?.name}</div>

                      <div>Temperature:</div>
                      <div className="font-medium">{agent.configuration?.temperature || "Default"}</div>

                      <div>Max Tokens:</div>
                      <div className="font-medium">{agent.configuration?.maxTokens || "Default"}</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                )}
              </div>
            </div>

            {/* Rightside - Chat Interface */}
            <div className="order-1 lg:order-2 flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-white h-[calc(100vh-150px)] min-h-[500px] overflow-hidden">
              {agent ? (
                <div className="h-full">
                  <ChatInterface agent={agent} chatId={`chat-${agentId}`} />
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

