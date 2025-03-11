import { CheckCircle } from "lucide-react";
import React from "react";

function UseCases() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover how AIsemble can transform your workflows
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Use Case 1 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <h3 className="text-xl font-semibold mb-2">Research & Analysis</h3>
          <p className="text-card-foreground/80 mb-4">
            Create a research team of AI agents to gather information, analyze
            data, and generate comprehensive reports.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Web research agent to gather information</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Data analysis agent to process findings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Report generation agent to create summaries</span>
            </li>
          </ul>
        </div>

        {/* Use Case 2 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
          <p className="text-card-foreground/80 mb-4">
            Deploy a team of AI agents to handle customer inquiries,
            troubleshoot issues, and escalate complex problems.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Triage agent to categorize incoming requests</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Knowledge base agent to provide solutions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Escalation agent to involve human support when needed</span>
            </li>
          </ul>
        </div>

        {/* Use Case 3 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <h3 className="text-xl font-semibold mb-2">Content Creation</h3>
          <p className="text-card-foreground/80 mb-4">
            Build a content team that researches topics, creates drafts, and
            refines content based on your guidelines.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Research agent to gather topic information</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Writing agent to create initial drafts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Editor agent to refine and improve content</span>
            </li>
          </ul>
        </div>

        {/* Use Case 4 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <h3 className="text-xl font-semibold mb-2">Project Management</h3>
          <p className="text-card-foreground/80 mb-4">
            Implement AI agents to track project progress, identify bottlenecks,
            and suggest optimizations.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Planning agent to break down projects into tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Tracking agent to monitor progress and deadlines</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Optimization agent to suggest process improvements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseCases;
