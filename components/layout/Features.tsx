import {
  Bot,
  CheckCircle,
  MessageSquare,
  PenToolIcon as Tool,
  Users,
  Zap,
} from "lucide-react";
import React from "react";

function Features() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Powerful AI Agent Capabilities
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create custom AI agents with specialized skills and form teams to
          tackle complex tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Custom AI Agents</h3>
          <p className="text-card-foreground/80">
            Create AI agents with unique personalities, skills, and knowledge
            bases tailored to your specific needs.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Team Formation</h3>
          <p className="text-card-foreground/80">
            Assemble teams of specialized AI agents that work together to solve
            complex problems and complete tasks.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Inter-Agent Communication
          </h3>
          <p className="text-card-foreground/80">
            Agents communicate with each other to share information, delegate
            tasks, and collaborate on solutions.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Tool className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Tool Integration</h3>
          <p className="text-card-foreground/80">
            Equip your agents with tools to search the web, process documents,
            analyze data, and more.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Human-in-the-Loop</h3>
          <p className="text-card-foreground/80">
            Maintain control with approval workflows and direct communication
            with your AI team.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-card text-card-foreground rounded-lg p-6 border border-border">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Workflow Automation</h3>
          <p className="text-card-foreground/80">
            Create automated workflows where agents handle routine tasks without
            human intervention.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
