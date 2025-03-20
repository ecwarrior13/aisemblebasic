import React from "react";
import SchematicEmbed from "./SchematicEmbed";
import { getTemporaryAccessToken } from "@/action/getTemporaryAccessToken";

async function SchematicComponent({ componentId }: { componentId: string }) {
  if (!componentId) {
    return null;
  }
  //get access token

  const accessToken = await getTemporaryAccessToken();
  if (!accessToken) {
    throw new Error("No access token");
  }
  return <SchematicEmbed accessToken={accessToken} componentId={componentId} />;
}

export default SchematicComponent;
