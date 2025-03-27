"use server";

import { api } from "@/convex/_generated/api";

import { FeatureFlag, featureFlagEvents } from "@/features/flags";

import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";


export async function fetchAgentsbyUser() {
    const user = await currentUser();
    if (!user?.id) {
        console.log("No user found");
        throw new Error("No user found");
    }

    try {
        const convex = getConvexClient();

        const agents = await convex.query(api.agent.getAllAgentsByAuthId, {
            authId: user.id
        });
        console.log("agents", agents.length);

        /*
        await client.track({
            event: featureFlagEvents[FeatureFlag.AGENT].event,
            company: {
                id: user?.id,
            },
            user: {
                id: user?.id,
            },
        });
        */
        return {
            success: true,
            agents: agents,
        }

    } catch (error) {
        console.error("Error fetching user agents:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch agents",
            agents: [],
        }
    }
}



export async function deleteAgentAction(agentId: string) {
    const user = await currentUser();
    if (!user?.id) {
        console.log("No user found");
        throw new Error("No user found");
    }

    try {
        const convex = getConvexClient();

        // Now we can pass the string ID directly
        const result = await convex.mutation(api.agent.deleteAgent, {
            agentId: agentId,
        })

        if (result.success) {
            console.log("Deleted agent", agentId);
            return {
                success: true,
            };

        };
        return {
            success: false,
            error: "Failed to delete agent",
        }


    } catch (error) {
        console.error("Error deleting agent:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete agent",
        };
    }
}

