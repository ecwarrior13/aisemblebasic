import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface ChatSelectorProps {
    agentName: string;
}

export function ChatSelector({ agentName }: ChatSelectorProps) {
    const [chats, setChats] = useState<any[]>([]); // We'll type this properly later

    return (
        <div className="px-4 pb-3 border-b border-white flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-primary hidden sm:block">{agentName}</h2>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs bg-primary text-white ml-auto">
                <PlusCircle className="h-3.5 w-3.5" />
                New Chat
            </Button>
        </div>
    )
}
