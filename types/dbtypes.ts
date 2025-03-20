import { Doc, Id } from "@/convex/_generated/dataModel"


// Agent types
export type Agent = Doc<"agents">
export type AgentId = Id<"agents">

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

