import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-2xl lg:px-16 lg:py-20"
        >
          {/* Animated Glow */}
          <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur">
              <Sparkles size={16} />
              AI-Powered Learning Platform
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Ready to Transform
              <br />
              Your Learning Journey?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
              Generate AI quizzes, track your progress, improve your knowledge,
              and prepare smarter with one intelligent platform built for modern
              learners.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 font-semibold text-primary shadow-lg"
              >
                Start Learning Free
                <ArrowRight size={18} />
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="border border-white/30 text-white hover:bg-white/10"
              >
                Explore Features
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                Free Forever Plan
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                No Credit Card
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                AI Powered
              </div>
            </div>

            {/* Bottom Text */}
            <p className="mt-8 text-sm text-primary-foreground/70">
              Trusted by thousands of students, educators, and professionals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}