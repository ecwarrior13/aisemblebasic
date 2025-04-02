import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to get all AI models
export const getAiModels = query({
    handler: async (ctx) => {
        return await ctx.db.query("aiModels")
            .withIndex("by_sortOrder")
            .order("asc")
            .collect();
    },
});



// Mutation to create a new AI model
export const createAiModel = mutation({
    args: {
        name: v.string(),
        apiModelName: v.string(),

        provider: v.string(),
        maxTokens: v.optional(v.string()),
        temperature: v.optional(v.string()),
        premium: v.boolean(),
        experimental: v.boolean(),
        supportsStreaming: v.boolean(),
        image: v.boolean(),
        notes: v.optional(v.string()),
        sortOrder: v.number(),
    },
    handler: async (ctx, args) => {
        const timestamp = Date.now();

        const modelId = await ctx.db.insert("aiModels", {
            name: args.name,
            apiModelName: args.apiModelName,

            provider: args.provider,
            maxTokens: args.maxTokens,
            temperature: args.temperature,
            premium: args.premium,
            experimental: args.experimental,
            supportsStreaming: args.supportsStreaming,
            image: args.image,
            notes: args.notes,
            sortOrder: args.sortOrder,
            createdAt: timestamp,
            updatedAt: timestamp,
        });

        return modelId;
    },
});