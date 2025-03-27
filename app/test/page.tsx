"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DebugAuth() {
  const debugIdentity = useMutation(api.agent.debugIdentity);
  const [result, setResult] = useState<{
    hasIdentity?: boolean;
    identityFields?: string[];
    error?: string;
  } | null>(null);

  const handleDebug = async () => {
    try {
      const debugResult = await debugIdentity();
      console.log("Debug result:", debugResult);
      setResult(debugResult);
    } catch (error) {
      console.error("Debug error:", error);
      setResult({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
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
  );
}
