"use client"
import { useChat } from "@ai-sdk/react"
import { Button } from "../ui/button"
import type { AgentWithModel } from "@/types/dbtypes"
import { ChatMessages } from "./ChatMessages"
import { PlusCircle } from "lucide-react"

interface ChatProps {
  chatId: string
  agent: AgentWithModel
}

function ChatInterface({ chatId, agent }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    maxSteps: 5,
    body: {
      agent: {
        modelId: agent.modelDetails?.apiModelName,
        systemPrompt: agent.systemPrompt,
        provider: agent.modelDetails?.provider,
      },
    },
  })

const isLoading = status === "streaming"

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 pb-3 border-b border-white flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">AI Agent Chat</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs bg-primary text-white" >
          <PlusCircle className="h-3.5 w-3.5" />
          New Chat
        </Button>
      </div>

      {/* Messages component */}
      <ChatMessages messages={messages} isLoading={isLoading} />

      {/* Input area */}
      <div className="border-t border-white p-4 bg-secondary/20 absolute bottom-0 left-0 right-0">
        <div className="space-y-3">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask your question here"
              className="flex-1 px-4 py-2 text-sm border border-primary rounded-full
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#457b9d] to-[#1d3557] text-white 
              text-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={isLoading || !input.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
