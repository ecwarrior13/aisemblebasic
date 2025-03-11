import Footer from "./Footer";
import Pricing from "./Pricing";
import UseCases from "./UseCases";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import HeroSection from "./HeroSection";
import Navigation from "./Navigation";
import CallToAction from "./CallToAction";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <Features />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-secondary/30">
          <HowItWorks />
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-20">
          <UseCases />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-secondary/30">
          <Pricing />
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <CallToAction />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 py-12">
        <Footer />
      </footer>
    </div>
  );
}
