import { Doc, Id } from "@/convex/_generated/dataModel"


// Agent types
export type Agent = Doc<"agents">
export type AgentId = Id<"agents">
// AI Model types
export type AIModel = Doc<"aiModels">;
export type AIModelId = Id<"aiModels">;

// Combined type for an agent with its model details
export type AgentWithModel = Agent & {
    modelDetails: AIModel | null;
};
// User types
export type User = Doc<"users">
export type UserId = Id<"users">

// Chat types
export type AgentChat = Doc<"agentChats">
export type AgentChatId = Id<"agentChats">

// Message types
export type ChatMessage = Doc<"chatMessages">
export type ChatMessageId = Id<"chatMessages">

// Participant types
export type ParticipantType = "user_agent" | "agent_agent"

// Message role types
export type MessageRole = "user" | "agent" | "system"
export type SenderType = "user" | "agent"

