import { Button } from "@/components/ui/button";
import { aiModelList } from "@/config/aiModels";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

import { useState } from "react";

// This function can be used in a React component to perform the migration
export function MigrateAIModels() {
  const insertModel = useMutation(api.aiModels.createAiModel);
  const existingModels = useQuery(api.aiModels.getAiModels);

  const [migrationStatus, setMigrationStatus] = useState({
    isRunning: false,
    added: 0,
    skipped: 0,
    errors: 0,
    messages: [] as string[],
  });

  // Check if loading
  if (existingModels === undefined) {
    return <div>Loading existing models...</div>;
  }

  const migrateModels = async () => {
    if (migrationStatus.isRunning) return;
    setMigrationStatus({
      isRunning: true,
      added: 0,
      skipped: 0,
      errors: 0,
      messages: ["Starting migration..."],
    });

    const existingApiModelNames = new Set(
      existingModels.map((model) => model.apiModelName)
    );

    for (const model of aiModelList) {
      // Check if the model already exists in the database and skip
      if (existingApiModelNames.has(model.apiModelName)) {
        setMigrationStatus((prev) => ({
          ...prev,
          skipped: prev.skipped + 1,
          messages: [...prev.messages, `Skipped existing model: ${model.name}`],
        }));
        continue;
      }
      try {
        await insertModel({
          name: model.name,
          apiModelName: model.apiModelName,
          provider: model.provider, // Map vendor to provider
          maxTokens: model.maxTokens,
          temperature: undefined, // This isn't in your source data
          premium: model.premium,
          experimental: model.experimental,
          supportsStreaming: model.supportsStreaming,
          image: model.image || false,
          notes: model.notes,
          sortOrder: model.sortOrder,
        });
        setMigrationStatus((prev) => ({
          ...prev,
          added: prev.added + 1,
          messages: [...prev.messages, `Inserted model: ${model.name}`],
        }));
      } catch (error) {
        setMigrationStatus((prev) => ({
          ...prev,
          errors: prev.errors + 1,
          messages: [
            ...prev.messages,
            `Error inserting model ${model.name}: ${error}`,
          ],
        }));
      }
    }
    setMigrationStatus((prev) => ({
      ...prev,
      isRunning: false,
      messages: [...prev.messages, "Migration complete!"],
    }));
  };

  return (
    <div>
      <h2>AI Models Migration</h2>

      <div style={{ marginBottom: "20px" }}>
        <strong>Migration Status:</strong>
        <ul>
          <li>Existing models in database: {existingModels.length}</li>
          <li>Total models in source file: {aiModelList.length}</li>
        </ul>
      </div>
      <Button onClick={migrateModels} disabled={migrationStatus.isRunning}>
        {migrationStatus.isRunning
          ? "Migration in progress..."
          : "Migrate Missing AI Models"}
      </Button>
      {migrationStatus.messages.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Migration Results:</h3>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              maxHeight: "300px",
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
              fontFamily: "monospace",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Added: </span>
              <span style={{ color: "#4CAF50" }}>{migrationStatus.added}</span>
              <span style={{ marginLeft: "20px", fontWeight: "bold" }}>
                Skipped:{" "}
              </span>
              <span style={{ color: "#FFA500" }}>
                {migrationStatus.skipped}
              </span>
              <span style={{ marginLeft: "20px", fontWeight: "bold" }}>
                Errors:{" "}
              </span>
              <span style={{ color: "#F44336" }}>{migrationStatus.errors}</span>
            </div>
            {migrationStatus.messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
