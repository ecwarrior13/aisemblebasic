import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ExistingModelsTable() {
  const aiModelList = useQuery(api.aiModels.getAiModels);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Models</CardTitle>
        <CardDescription>
          All AI models currently in the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        {aiModelList ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Max Tokens</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiModelList.map((model) => (
                <TableRow key={model.name}>
                  <TableCell className="font-medium">
                    {model.name}
                    {model.premium && (
                      <Badge variant="outline" className="ml-2">
                        Premium
                      </Badge>
                    )}
                    {model.image && (
                      <Badge variant="outline" className="ml-2">
                        Image
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {model.apiModelName}
                  </TableCell>
                  <TableCell>{model.provider}</TableCell>
                  <TableCell>{model.maxTokens}</TableCell>

                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">Loading models...</div>
        )}
      </CardContent>
    </Card>
  );
}

export default ExistingModelsTable;
