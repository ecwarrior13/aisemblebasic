import { AgentWithModel } from "@/types/dbtypes";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//get all agents for a specific user
export const getAllAgentsByAuthId = query({
    args: {
        authId: v.string(),
    },
    handler: async (ctx, args) => {
        // First, get the user by authId
        const user = await ctx.db
            .query("users")
            .withIndex("by_authId", (q) => q.eq("authId", args.authId))
            .first();

        if (!user) {
            return []; // Or you could throw an error if you prefer
        }

        // Then fetch all agents for this user
        const agents = await ctx.db
            .query("agents")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .order("desc")
            .collect();

        return agents;
    },
});
//get all agents for a user with the aimodel information
export const getAllAgentswithModelInfo = query({
    args: {
        authId: v.string(),
    },
    handler: async (ctx, args) => {
        // First, get the user by authId
        const user = await ctx.db
            .query("users")
            .withIndex("by_authId", (q) => q.eq("authId", args.authId))
            .first();

        if (!user) {
            return []; // Or you could throw an error if you prefer
        }

        // Then fetch all agents for this user
        const agents = await ctx.db
            .query("agents")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .order("desc")
            .collect();

        // Batch fetch all the models needed
        const modelIds = [...new Set(agents.map(agent => agent.modelId))];
        const models = await Promise.all(
            modelIds.map(id => ctx.db.get(id))
        );

        // Create a map of model IDs to model details
        // Create a map of model IDs to model details
        const modelMap = Object.fromEntries(
            models.filter(Boolean).map(model => [model?._id, model])
        );

        // Combine agent data with model data
        return agents.map(agent => ({
            ...agent,
            modelDetails: modelMap[agent.modelId] || null
        })) as AgentWithModel[];
    },
});


export const createAgent = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        modelId: v.id("aiModels"),
        systemPrompt: v.string(),
        // Other args but NOT userAuthId
        configuration: v.optional(
            v.object({
                temperature: v.optional(v.number()),
                maxTokens: v.optional(v.number()),
                topP: v.optional(v.number()),
            })
        ),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Verify the user is authenticated
        console.log("Getting user identity...");
        const identity = await ctx.auth.getUserIdentity();
        console.log("Got identity:", identity);
        if (!identity) {
            throw new Error("Unauthorized: You must be logged in to create an agent");
        }

        // Get the authenticated user's ID from the identity
        const authId = identity.subject;

        // Find the user by the authenticated authId
        const user = await ctx.db
            .query("users")
            .withIndex("by_authId", (q) => q.eq("authId", authId))
            .first();

        if (!user) {
            throw new Error("User not found");
        }

        // Create the agent with the verified user ID
        const agent = await ctx.db.insert("agents", {
            userId: user._id,
            name: args.name,
            description: args.description || "",
            modelId: args.modelId,
            systemPrompt: args.systemPrompt,
            configuration: args.configuration || {},
            imageUrl: args.imageUrl || "",
            isActive: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),

        });

        return agent;
    }
})

export const deleteAgent = mutation({
    args: {
        agentId: v.string(), // Accept a string ID instead of a typed ID
    },
    handler: async (ctx, args) => {
        // Verify the user is authenticated
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized: You must be logged in to delete an agent")
        }

        // Get the authenticated user's ID from the identity
        const authId = identity.subject

        // Find the user by the authenticated authId
        const user = await ctx.db
            .query("users")
            .withIndex("by_authId", (q) => q.eq("authId", authId))
            .first()

        if (!user) {
            throw new Error("User not found")
        }

        // Convert the string ID to a Convex ID
        const agentId = ctx.db.normalizeId("agents", args.agentId)
        if (!agentId) {
            throw new Error("Invalid agent ID")
        }

        // Get the agent to verify ownership
        const agent = await ctx.db.get(agentId)

        if (!agent) {
            throw new Error("Agent not found")
        }

        // Verify the user owns this agent
        if (agent.userId !== user._id) {
            throw new Error("Unauthorized: You can only delete your own agents")
        }

        // Delete the agent
        await ctx.db.delete(agentId)

        return { success: true }
    },
})
// Query to get an agent by ID
export const getAgentById = query({
    args: { id: v.id("agents") },
    handler: async (ctx, args) => {
        try {
            const agent = await ctx.db.get(args.id);
            //return await ctx.db.get(args.id);
            return agent;
        } catch (error) {
            console.error("Error fetching agent:", error);
            return null;
        }
    },
});

export const getAgentWithModel = query({
    args: { id: v.id("agents") },
    handler: async (ctx, args): Promise<AgentWithModel | null> => {
        // Get the agent
        const agent = await ctx.db.get(args.id);

        if (!agent) {
            return null;
        }

        // Get the model details
        const modelDetails = await ctx.db.get(agent.modelId);

        // Return the agent with model details
        return {
            ...agent,
            modelDetails: modelDetails || null
        };
    },
});

// Mutation to update an agent
export const updateAgent = mutation({
    args: {
        id: v.id("agents"),
        name: v.string(),
        description: v.optional(v.string()),
        modelId: v.id("aiModels"),
        systemPrompt: v.string(),
        configuration: v.object({
            temperature: v.number(),
            maxTokens: v.optional(v.number()),
        }),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;

        // Check if the agent exists
        const existingAgent = await ctx.db.get(id);
        if (!existingAgent) {
            throw new Error(`Agent with ID ${id} not found`);
        }

        // Update the agent
        await ctx.db.patch(id, fields);

        // Return a success indicator
        return { success: true, id };
    },
});
// Add this to your agent.ts file
export const debugIdentity = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("Full identity object:", JSON.stringify(identity, null, 2));
        return {
            hasIdentity: !!identity,
            identityFields: identity ? Object.keys(identity) : [],
            tokenIdentifier: identity ? identity.tokenIdentifier : null,
            subject: identity ? identity.subject : null,
        };
    }
});