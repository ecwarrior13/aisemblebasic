import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function HowItWorks() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How AIsemble Works
        </h2>
        <p className="text-xl text-secondary-foreground/80 dark:text-foreground max-w-2xl mx-auto">
          A simple process to create and manage your AI agent team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Agents</h3>
          <p className="text-secondary-foreground/80 dark:text-foreground">
            Design custom AI agents with specific skills, knowledge, and
            personalities to suit your needs.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">Form Teams</h3>
          <p className="text-secondary-foreground/80 dark:text-foreground">
            Assemble your agents into teams with defined roles and
            responsibilities for maximum efficiency.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Assign Tasks</h3>
          <p className="text-secondary-foreground/80 dark:text-foreground">
            Set tasks for your team and watch as they collaborate, communicate,
            and deliver results.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/signup">
          <Button size="lg">Start Building Your AI Team</Button>
        </Link>
      </div>
    </div>
  );
}

export default HowItWorks;
