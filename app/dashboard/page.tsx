import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { requireAuth } from "@/action/users";

import { Skeleton } from "@/components/ui/skeleton";
import Usage from "@/components/Usage";
import { FeatureFlag } from "@/features/flags";
import EnabledFeatures from "@/components/EnabledFeatures";

import { fetchAgentsbyUser } from "@/action/Agents/agentActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import AgentsDisplay from "./_component/AgentsDisplay";

export default async function DashboardPage() {
  const user = await requireAuth();

  if (!user) {
    redirect("/sign-in");
  }

  const { success, agents, error } = await fetchAgentsbyUser();
  console.log("agents", agents);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.firstName || "User"}!
        </h1>
      </div>
      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leftside */}
        <div className="flex flex-col gap-6 p-4 border border-gray-200 rounded-xl bg-white">
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-secondary">
            <Suspense fallback={<UserAgentsSkeleton />}>
              <Usage featureFlag={FeatureFlag.AGENT} title="Agents" />
              <Link href="/dashboard/create-agent">
                <Button className="w-full">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create New Agent
                </Button>
              </Link>
              {/* <UserAgents /> */}
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<UserAgentsSkeleton />}>
              <AgentsDisplay initialAgents={agents} />
            </Suspense>
          </div>
        </div>

        <div className="lg:order-2 flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-white">
          {/* Right Side */}
          <EnabledFeatures />
        </div>
      </div>
    </div>
  );
}

function UserAgentsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}
