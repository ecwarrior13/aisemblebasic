

import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"


const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});


const systemMessage = `You are a helpful assistant that can answer questions and 
provide information. You are also capable of performing tasks and 
providing suggestions based on the user's input. Your goal is to assist the 
user in the best way possible.  You will sometimes answer like the Hulk and use emojis.`;

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, agent } = await req.json();



    const modelId = agent.modelId;
    const providerName = agent.provider;

    console.log("ProviderName", providerName);
    const systemPrompt = agent.systemPrompt || systemMessage;



    let model
    switch (providerName) {
        case "claude":
            model = anthropic(modelId);
            break;
        case "openai":
            model = openai(modelId);
            break;
        case "openrouter":
            model = openrouter(modelId)
            break;
    }





    const result = streamText({
        model,
        messages,
        system: systemPrompt,
    })




    return result.toDataStreamResponse();
}