import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        // Users table - stores basic user information
        // Note: Convex automatically creates an _id field which is referenced as userId in other tables
        authId: v.string(), //ID from auth provider
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_email", ["email"]).index("by_authId", ["authId"]),


    agents: defineTable({
        // AI Agents table - stores information about each AI agent
        userId: v.id("users"), // Reference to the user who created this agent
        name: v.string(), // Name of the AI agent
        description: v.optional(v.string()), // Optional description
        modelId: v.id("aiModels"), // ID of the LLM model to use (e.g., "gpt-4o", "claude-3-opus")
        systemPrompt: v.string(), // System prompt for the agent
        isActive: v.boolean(), // Whether the agent is active or not
        imageUrl: v.optional(v.string()), // Optional avatar for the agent
        configuration: v.optional(
            v.object({
                // Additional configuration options
                temperature: v.optional(v.number()),
                maxTokens: v.optional(v.number()),
                topP: v.optional(v.number()),
                // Add other model-specific parameters as needed
            }),
        ),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_userId", ["userId"]) // To find all agents created by a user
        .index("by_active", ["isActive"]) // To find all active agents
        .index("by_model", ["modelId"]), // To find all agents using a specific model


    agentChats: defineTable({
        // Agent Chats table - stores chat sessions
        name: v.optional(v.string()), // Optional name for the chat
        // Chat can be between a user and an agent, or between two agents
        participantType: v.string(), // "user_agent" or "agent_agent"

        // For user-agent chats
        userId: v.optional(v.id("users")), // User participant (if user-agent chat)
        agentId: v.id("agents"), // Primary agent participant

        // For agent-agent chats
        secondaryAgentId: v.optional(v.id("agents")), // Secondary agent participant (if agent-agent chat)

        isArchived: v.boolean(), // Whether the chat is archived
        lastMessageAt: v.number(), // Timestamp of the last message
        createdAt: v.number(),
    })
        .index("by_userId", ["userId"]) // To find all chats for a user
        .index("by_agentId", ["agentId"]) // To find all chats for an agent
        .index("by_secondaryAgentId", ["secondaryAgentId"]) // To find all chats for a secondary agent
        .index("by_lastMessageAt", ["lastMessageAt"]), // To sort chats by recency

    chatMessages: defineTable({
        // Chat Messages table - stores individual messages in chat sessions
        chatId: v.id("agentChats"), // Reference to the chat
        role: v.string(), // "user", "agent", or "system"
        content: v.string(), // Message content
        senderId: v.union(v.id("users"), v.id("agents")), // ID of the sender (user or agent)
        senderType: v.string(), // "user" or "agent"
        metadata: v.optional(
            v.object({
                // Additional metadata
                modelId: v.optional(v.string()), // Model used for this message
                tokenCount: v.optional(v.number()), // Token count for this message
                processingTime: v.optional(v.number()), // Time taken to generate response
            }),
        ),
        createdAt: v.number(),
    })
        .index("by_chatId", ["chatId"]) // To find all messages in a chat
        .index("by_chatId_createdAt", ["chatId", "createdAt"]), // To sort messages by time

    aiModels: defineTable({
        // AI Models table - stores information about available AI models
        name: v.string(), // Name of the model (e.g., "gpt-4o", "claude-3-opus")
        apiModelName: v.string(), // API name of the model (e.g., "gpt-4", "claude-3")
        provider: v.string(), // Provider of the model (e.g., "OpenAI", "Anthropic")
        maxTokens: v.optional(v.string()), // Maximum tokens supported by the model
        temperature: v.optional(v.string()), // Default temperature for the model
        premium: v.boolean(), // Whether the model is premium or not
        experimental: v.boolean(), // Whether the model is experimental or not
        supportsStreaming: v.boolean(), // Whether the model supports streaming
        image: v.boolean(), // Whether the model supports image generation
        notes: v.optional(v.string()), // Optional notes about the model
        sortOrder: v.number(), // Order for displaying models in the UI
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_sortOrder", ["sortOrder"]) // To sort models by order
})


/*
  plans: defineTable({
        name: v.string(),
        description: v.string(),
        priceMontly: v.number(),
        priceYearly: v.number(),
        features: v.array(v.string()),
        limits: v.object({
            maxAgents: v.number(),
            maxTeams: v.number(),
            maxTools: v.number(),
        }),
        isActive: v.boolean(),
        displayOrder: v.number(), //for ordering in UI
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_name", ["name"]),

    usage: defineTable({
        userId: v.id("users"),
        planId: v.id("plans"),
        status: v.string(),
        startDate: v.number(),
        endDate: v.number(),
    })
        */