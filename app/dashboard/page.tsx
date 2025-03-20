import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { requireAuth } from "@/action/users";
import UserAgents from "./_component/UserAgents";
import { Skeleton } from "@/components/ui/skeleton";
import Usage from "@/components/Usage";
import { FeatureFlag } from "@/features/flags";
import EnabledFeatures from "@/components/EnabledFeatures";

export default async function DashboardPage() {
  //const { userId } = await auth();

  const user = await requireAuth();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.firstName || "User"}!
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-6 p-4 border border-gray-200 rounded-xl bg-white">
          Left side
          <div className="p-6">
            <div className="h-full py-6">
              <Suspense fallback={<UserAgentsSkeleton />}>
                <Usage featureFlag={FeatureFlag.AGENT} title="Agents" />
                <UserAgents />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="lg:order-2 flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-white">
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
