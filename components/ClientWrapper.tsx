"use client";

import { ConvexClientProvider } from "./ConvexClientProvider";
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schematicPublicKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  console.log(schematicPublicKey);
  if (!schematicPublicKey) {
    throw new Error("Missing SCHEMATIC_PUBLISHABLE_KEY environment variable");
  }

  return (
    <ConvexClientProvider>
      <SchematicProvider publishableKey={schematicPublicKey}>
        <SchematicWrapped>{children}</SchematicWrapped>
      </SchematicProvider>
    </ConvexClientProvider>
  );
}
