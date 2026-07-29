import React from "react";
import {
  Brain,
  Clock,
  Target,
  ChartNoAxesCombined,
  Bot,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Quiz Generator",
    icon: Brain,
    desc: "Paste any topic or document and instantly generate high-quality AI quizzes.",
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    title: "Adaptive Difficulty",
    icon: Target,
    desc: "Questions automatically adapt to your performance and learning speed.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Instant AI Feedback",
    icon: Bot,
    desc: "Receive detailed AI explanations after every answer to improve faster.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Progress Analytics",
    icon: ChartNoAxesCombined,
    desc: "Track performance with detailed reports, strengths, and improvement areas.",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Timed Exam Mode",
    icon: Clock,
    desc: "Practice under real exam conditions with countdown timers and auto-submit.",
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Secure & Private",
    icon: ShieldCheck,
    desc: "Your quizzes and learning history remain safe with secure authentication.",
    color: "bg-teal-500/10 text-teal-500",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Everything You Need
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Powerful Features for Smarter Learning
          </h2>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Everything you need to generate AI quizzes, improve faster,
            analyze progress, and prepare for real-world exams.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Card className="group h-full overflow-hidden rounded-2xl border bg-background/70 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl">
                <CardContent className="flex h-full flex-col p-7">
                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.12,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <item.icon size={28} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 leading-7 text-muted-foreground">
                    {item.desc}
                  </p>

                  {/* CTA */}
                  <button className="mt-6 flex items-center gap-2 font-medium text-primary transition-all group-hover:gap-3">
                    Learn More
                    <ArrowRight size={17} />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}