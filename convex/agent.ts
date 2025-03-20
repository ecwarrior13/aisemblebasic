import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//get all agents for a specific user
export const getAllAgentsbyUser = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        //Fetch all agents for a specific user
        const agents = await ctx.db
            .query("agents")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("desc")
            .collect();

        return agents;
    },
})