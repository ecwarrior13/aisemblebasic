"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function DebugAuth() {
  const debugIdentity = useMutation(api.agent.debugIdentity);
  const createChat = useMutation(api.chatmessages.createAgentChat);
  const [authId, setAuthId] = useState<string>("");
  const agents = useQuery(api.agent.getAllAgentswithModelInfo, { authId });
  
  const [result, setResult] = useState<{
    hasIdentity?: boolean;
    identityFields?: string[];
    tokenIdentifier?: string | null;
    subject?: string | null;
    error?: string;
  } | null>(null);

  const [chatResult, setChatResult] = useState<{
    chatId?: Id<"agentChats">;
    error?: string;
  } | null>(null);

  const handleDebug = async () => {
    try {
      const debugResult = await debugIdentity();
      console.log("Debug result:", debugResult);
      setResult(debugResult);
      if (debugResult.hasIdentity && debugResult.subject) {
        console.log("Setting auth ID:", debugResult.subject);
        setAuthId(debugResult.subject);
      }
    } catch (error) {
      console.error("Debug error:", error);
      setResult({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleCreateChat = async () => {
    if (!agents || agents.length === 0) {
      setChatResult({ error: "No agents available" });
      return;
    }

    try {
      const chatId = await createChat({ agentId: agents[2]._id });
      console.log("Created chat:", chatId);
      setChatResult({ chatId });
    } catch (error) {
      console.error("Chat creation error:", error);
      setChatResult({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleCreateChatWithSpecificAgent = async () => {
    try {
      const specificAgentId = "jd7a6rmb7exfh6j8rz72z0b5ph7d3fcd" as Id<"agents">;
      const chatId = await createChat({ agentId: specificAgentId });
      console.log("Created chat with specific agent:", chatId);
      setChatResult({ chatId });
    } catch (error) {
      console.error("Chat creation error:", error);
      setChatResult({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <div className="p-4 space-y-8">
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Debug Authentication</h2>
        <Button onClick={handleDebug}>Debug Identity</Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium">Results:</h3>
            <pre className="mt-2 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Test Chat Creation</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Test with Available Agents:</h3>
            {agents && (
              <div className="mt-2 space-y-2">
                <div className="text-sm text-gray-600">
                  Available agents: {agents.length}
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-1">Agent List:</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {agents.map((agent, index) => (
                      <li key={agent._id} className={index === 0 ? "text-blue-600 font-medium" : ""}>
                        {agent.name} {index === 0 && "(Will be selected for chat creation)"}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={handleCreateChat}>Create New Chat</Button>
              </div>
            )}
            {agents?.length === 0 && authId && (
              <div className="text-red-500 mt-1">
                No agents found for auth ID: {authId}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Test with Specific Agent:</h3>
            <Button onClick={handleCreateChatWithSpecificAgent}>
              Create Chat with Specific Agent
            </Button>
          </div>

          {chatResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium">Chat Creation Result:</h3>
              <pre className="mt-2 text-sm overflow-auto">
                {JSON.stringify(chatResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
