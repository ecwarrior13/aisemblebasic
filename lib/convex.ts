import { ConvexHttpClient } from "convex/browser";

// Create a client for server-side HTTP requests that can handle authentication
export const getConvexClient = (authToken?: string) => {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
        throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
    }

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    // Set the auth token if provided
    if (authToken) {
        client.setAuth(authToken);
    }

    return client;
};