"use client";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { useSchematicFlag } from "@schematichq/schematic-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Usage from "./Usage";

function EnabledFeatures() {
  const isAgentChat = useSchematicFlag(FeatureFlag.AGENT_CHAT);
  const isPreDefinedTask = useSchematicFlag(FeatureFlag.PRE_DEFINED_TASKS);
  const isPreDefinedTeams = useSchematicFlag(FeatureFlag.PRE_DEFINED_TEAMS);

  const features = [
    { name: FeatureFlag.AGENT_CHAT, enabled: isAgentChat, label: "Agent Chat" },
    {
      name: FeatureFlag.PRE_DEFINED_TASKS,
      enabled: isPreDefinedTask,
      label: "Pre-defined Tasks",
    },
    {
      name: FeatureFlag.PRE_DEFINED_TEAMS,
      enabled: isPreDefinedTeams,
      label: "Pre-defined Teams",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Enabled Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex items-center justify-between"
              >
                <Label
                  htmlFor={feature.name}
                  className="flex items-center gap-2"
                >
                  <span>{feature.label}</span>
                  <Badge variant={feature.enabled ? "default" : "outline"}>
                    {feature.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Agent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Usage
            featureFlag={FeatureFlag.AGENT_TASKS}
            title="Agent Task Usage"
          />
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Enable AI agents to create tasks for other AI Agents or
              Human-in-the-Loop.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Agent Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <Usage
            featureFlag={FeatureFlag.AGENT_TEAM}
            title="Agent Team Usage"
          />
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Enable AI agents to chat with each other and collaborate on tasks.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Agent Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <Usage featureFlag={FeatureFlag.TOOLS} title="Agent Tools Usage" />
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Enable AI agents to utilize tools to perform tasks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EnabledFeatures;
