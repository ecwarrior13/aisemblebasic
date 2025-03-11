import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

function CallToAction() {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Transform Your Workflow?
      </h2>
      <p className="text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/90">
        Join thousands of users who are already leveraging AI agent teams to
        boost productivity and innovation.
      </p>
      <Link href="/signup">
        <Button
          size="lg"
          variant="secondary"
          className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Get Started Today <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export default CallToAction;
