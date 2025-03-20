import { waitFor } from "@/lib/waitFor";
import React from "react";

async function UserAgents() {
  await waitFor(5000);
  return <div>UserAgents</div>;
}

export default UserAgents;
