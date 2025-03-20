"use server";

import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser() {
    const convex = getConvexClient();
    const user = await currentUser();

    if (!user) {
        console.log("No user found");
        return null;
    }

    try {
        //find user in convex DB

        const dbUser = await convex.query(api.users.getUserByAuthId, {
            authId: user.id
        });

        //if user does not exist in convex, create user
        if (!dbUser) {
            await convex.mutation(api.users.createUser, {
                authId: user.id,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                email: user.emailAddresses[0]?.emailAddress || '',
                imageUrl: user.imageUrl || '',
            });
            console.log("User created in convex");

            return {
                ...user
            }
        }
        return {
            ...user
        }


    } catch (error) {
        console.error(error);
        return null;

    }
}


export async function requireAuth() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect('/sign-in');
    }

    return user;
}