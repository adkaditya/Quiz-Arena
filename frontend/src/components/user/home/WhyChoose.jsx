import {
  CheckCircle,
  TrendingUp,
  Zap,
  Award,
  ArrowRight,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { motion } from "framer-motion";

const points = [
  {
    title: "AI-generated quality questions",
    desc: "Generate high-quality questions using AI with better accuracy and topic coverage.",
  },
  {
    title: "Adaptive difficulty system",
    desc: "Questions automatically adjust according to your performance and learning pace.",
  },
  {
    title: "Detailed performance reports",
    desc: "Analyze topic-wise accuracy, completion time, and improvement areas after every quiz.",
  },
  {
    title: "Learn faster with smart analytics",
    desc: "Focus on weak topics using personalized recommendations powered by AI.",
  },
];

const highlights = [
  {
    icon: Zap,
    value: "3×",
    label: "Faster Learning",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Average Improvement",
  },
  {
    icon: Award,
    value: "10K+",
    label: "Happy Learners",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden border-y bg-muted/40 py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-primary/30 bg-primary/5 text-primary"
            >
              Why Choose Quizify
            </Badge>

            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Smarter Learning with{" "}
              <span className="text-primary">
                AI-Powered Intelligence
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Quizify combines Artificial Intelligence, adaptive learning,
              real-time analytics, and interactive quizzes to help you
              prepare more efficiently and improve consistently.
            </p>

            <div className="mt-10 space-y-6">
              {points.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  className="flex gap-4 rounded-xl p-3 transition-all hover:bg-background"
                >
                  <div className="mt-1">
                    <CheckCircle
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1 leading-7 text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-10 flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3">
              Discover More
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {highlights.map(({ icon: Icon, value, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.12,
                }}
                className="group flex items-center gap-6 rounded-2xl border bg-background/70 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon
                    size={28}
                    className="text-primary"
                  />
                </div>

                <div>
                  <div className="text-4xl font-extrabold text-primary">
                    {value}
                  </div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Testimonial */}
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border bg-background/70 p-6 backdrop-blur-xl shadow-sm"
            >
              <p className="italic leading-7 text-muted-foreground">
                "Quizify completely changed the way I prepare for exams.
                The AI explanations and adaptive quizzes helped me
                understand concepts much faster."
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  A
                </div>

                <div>
                  <p className="font-semibold">
                    Aditya Kumar
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Student & Quizify User
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}