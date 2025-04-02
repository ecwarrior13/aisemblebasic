import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createAgentChat = mutation({
    //define the arguments
    args: {
        agentId: v.id("agents"),
    },
    handler: async (ctx, args) => {
        // Get the current user's ID from the auth context
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        // Get the Convex user ID from the auth ID
        const user = await ctx.db
            .query("users")
            .withIndex("by_authId", (q) => q.eq("authId", identity.subject))
            .first();

        if (!user) {
            throw new Error("User not found in database");
        }

        // Create a new chat
        const chatId = await ctx.db.insert("agentChats", {
            name: "New Chat",
            participantType: "user_agent",
            userId: user._id, // Use the Convex user ID instead of the auth ID
            agentId: args.agentId,
            isArchived: false,
            lastMessageAt: Date.now(),
            createdAt: Date.now(),
        });

        return chatId;
    }
})