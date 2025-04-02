"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditAgentFormProps {
  agentId: string;
  onClose: () => void;
}

export default function EditAgentForm({
  agentId,
  onClose,
}: EditAgentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [selectedModel, setSelectedModel] = useState(
    "jn7avtfkf0p8c1y997b5dw1p5x7d2ktj"
  );

  // Convert string ID to Convex ID
  const typedAgentId = agentId as Id<"agents">;

  // Fetch the agent data
  const agent = useQuery(api.agent.getAgentById, { id: typedAgentId });

  // Fetch the AI model list
  const aiModelList = useQuery(api.aiModels.getAiModels);
  // Get the update mutation
  const updateAgentMutation = useMutation(api.agent.updateAgent);

  // Update form values when agent data is loaded
  useEffect(() => {
    if (agent) {
      setSelectedModel(agent.modelId);
      setTemperature(agent.configuration?.temperature || 0.7);
    }
  }, [agent]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    try {
      const result = await updateAgentMutation({
        id: typedAgentId,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        modelId: formData.get("modelId") as Id<"aiModels">,
        systemPrompt: formData.get("systemPrompt") as string,
        configuration: {
          temperature: temperature,
          maxTokens: formData.get("maxTokens")
            ? Number.parseInt(formData.get("maxTokens") as string)
            : undefined,
        },
      });

      if (!result) {
        throw new Error("Failed to update agent");
      }

      toast.success("Agent updated successfully");
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error updating agent:", error);
      toast.error("Failed to update agent", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!agent) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 max-w-2xl max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Edit AI Agent</h1>

      <form action={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Agent Details</CardTitle>
            <CardDescription>
              Update your AI agent&apos;s personality and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                className="bg-white"
                id="name"
                name="name"
                placeholder="e.g., Research Assistant"
                defaultValue={agent.name || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                className="bg-white"
                id="description"
                name="description"
                placeholder="What does this agent do?"
                rows={2}
                defaultValue={agent.description || ""}
              />
            </div>
            {/*
            <div className="space-y-2">
              <Label htmlFor="modelId">AI Model</Label>
              <Select
                name="modelId"
                defaultValue={agent.modelId || selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="claude-3-sonnet">
                    Claude 3 Sonnet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
*/}
            <div className="space-y-2">
              <Label htmlFor="modelId">AI Model</Label>
              <Select
                name="modelId"
                defaultValue={agent.modelId || selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {aiModelList!.map((model) => (
                    <SelectItem key={model.apiModelName} value={model._id}>
                      {model.name}
                      {model.premium && (
                        <span className="ml-2 text-xs text-amber-500">
                          Premium
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                className="bg-white"
                id="systemPrompt"
                name="systemPrompt"
                placeholder="Instructions for how the AI should behave..."
                rows={5}
                defaultValue={agent.systemPrompt || ""}
                required
              />
              <p className="text-xs text-muted-foreground">
                This is the instruction set that defines your agent&apos;s
                personality and capabilities.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="temperature">Temperature: {temperature}</Label>
                <span className="text-xs text-muted-foreground">
                  {temperature < 0.3
                    ? "More focused"
                    : temperature > 0.7
                      ? "More creative"
                      : "Balanced"}
                </span>
              </div>
              <Slider
                id="temperature"
                name="temperature"
                min={0}
                max={1}
                step={0.1}
                defaultValue={[agent.configuration?.temperature || 0.7]}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                aria-label="Temperature"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens (Optional)</Label>
              <Input
                className="bg-white"
                id="maxTokens"
                name="maxTokens"
                type="number"
                placeholder="e.g., 2048"
                defaultValue={agent.configuration?.maxTokens?.toString() || ""}
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of tokens in the response. Leave empty for model
                default.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
