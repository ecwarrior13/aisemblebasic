import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to check if a user exists by their auth ID
export const getUserByAuthId = query({
    args: { authId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('users')
            .withIndex('by_authId', (q) => q.eq('authId', args.authId))
            .first();
    },
});

// Query to get user by email
export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('users')
            .withIndex('by_email', (q) => q.eq('email', args.email))
            .first();
    },
});

// Mutation to create a new user or return existing user
export const createUser = mutation({
    args: {
        authId: v.string(),
        name: v.string(),
        email: v.string(),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query('users')
            .withIndex('by_authId', (q) => q.eq('authId', args.authId))
            .first();

        if (existingUser) {
            return existingUser._id;
        }

        // Check if email is already taken
        const emailExists = await ctx.db
            .query('users')
            .withIndex('by_email', (q) => q.eq('email', args.email))
            .first();

        if (emailExists) {
            throw new Error('Email already registered');
        }

        // Create new user
        const userId = await ctx.db.insert('users', {
            authId: args.authId,
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl || '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return userId;
    },
});
