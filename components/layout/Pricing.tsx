import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function Pricing() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-foreground">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-secondary-foreground/80 dark:text-foreground max-w-2xl mx-auto">
          Choose the plan that is right for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Starter Plan */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Free</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold">Free</span>
            {/* <span className="text-card-foreground/70">/month</span> */}
          </div>
          <p className="text-card-foreground/80 mb-6">
            Perfect to get started and try out pre-made AI agents and teams.
          </p>
          <ul className="space-y-2 mb-8 flex-1">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Up to 3 custom AI agents</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Pre-made team configuration</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Basic tool integrations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>5 concurrent tasks</span>
            </li>
          </ul>
          <Link href="/signup?plan=starter" className="mt-auto">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>

        {/* Professional Plan */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-accent flex flex-col relative">
          <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Most Popular
          </div>
          <h3 className="text-xl font-semibold mb-2">Starter</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold">$89</span>
            <span className="text-card-foreground/70">/month</span>
          </div>
          <p className="text-card-foreground/80 mb-6">
            Ideal for multiple AI Agent teams
          </p>
          <ul className="space-y-2 mb-8 flex-1">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Up to 10 custom AI agents</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>3 team configurations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Advanced tool integrations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>20 concurrent tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Priority support</span>
            </li>
          </ul>
          <Link href="/signup?plan=professional" className="mt-auto">
            <Button className="w-full" variant="default">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold">Custom</span>
          </div>
          <p className="text-card-foreground/80 mb-6">
            For large organizations with specific needs
          </p>
          <ul className="space-y-2 mb-8 flex-1">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Unlimited AI agents</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Unlimited team configurations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Custom tool development</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Unlimited concurrent tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Dedicated account manager</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Custom SLAs</span>
            </li>
          </ul>
          <Link href="/contact-sales" className="mt-auto">
            <Button className="w-full" variant="outline">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
