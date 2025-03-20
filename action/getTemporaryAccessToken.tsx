"use server";

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const schematicKey = process.env.SCHEMATIC_API_KEY;

if (!schematicKey) {
  throw new Error("Missing SCHEMATIC_API_KEY");
}

const client = new SchematicClient({
  apiKey: schematicKey,
});

export async function getTemporaryAccessToken() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const response = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: {
      id: user.id,
    },
  });
  return response.data.token;
}
