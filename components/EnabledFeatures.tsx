"use client";
import { FeatureFlag } from "@/features/flags";
import { useSchematicFlag } from "@schematichq/schematic-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formatFeatureName = (flag: string) => {
  return flag
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

function EnabledFeatures() {
  const isAgentChat = useSchematicFlag(FeatureFlag.AGENT_CHAT);
  const isPreDefinedTask = useSchematicFlag(FeatureFlag.PRE_DEFINED_TASKS);
  const isPreDefinedTeams = useSchematicFlag(FeatureFlag.PRE_DEFINED_TEAMS);

  const features = [
    { name: FeatureFlag.AGENT_CHAT, enabled: isAgentChat },
    { name: FeatureFlag.PRE_DEFINED_TASKS, enabled: isPreDefinedTask },
    { name: FeatureFlag.PRE_DEFINED_TEAMS, enabled: isPreDefinedTeams },
  ];

  return (
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
              <Label htmlFor={feature.name} className="flex flex-col space-y-1">
                <span>{formatFeatureName(feature.name)}</span>
                <span className="text-xs text-muted-foreground">
                  {feature.enabled ? "Enabled" : "Disabled"}
                </span>
              </Label>
              <Switch
                id={feature.name}
                checked={feature.enabled}
                // This is just for display - actual toggling would require integration with Schematic's API
                disabled
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default EnabledFeatures;
