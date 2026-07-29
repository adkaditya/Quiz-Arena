import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Badge } from "../../ui/badge";
import { motion } from "framer-motion";

const faqs = [
  {
    id: "1",
    q: "How does Quizify generate quizzes using AI?",
    a: "Quizify uses advanced AI models to analyze your topic or uploaded content and instantly generate high-quality multiple-choice quizzes with explanations.",
  },
  {
    id: "2",
    q: "Is Quizify free to use?",
    a: "Yes. You can start with the free plan, which includes AI quiz generation and basic analytics. Premium plans unlock unlimited quizzes and advanced insights.",
  },
  {
    id: "3",
    q: "Can I track my learning progress?",
    a: "Absolutely. Your dashboard provides score trends, topic-wise performance, accuracy, and learning progress over time.",
  },
  {
    id: "4",
    q: "Which subjects are supported?",
    a: "Quizify supports programming, science, mathematics, engineering, history, finance, medicine, business, and many other subjects.",
  },
  {
    id: "5",
    q: "Is my personal data secure?",
    a: "Yes. Your information is protected using secure authentication and encrypted communication. Your learning data remains private.",
  },
];

export default function FAQ() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Frequently Asked Questions
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Got Questions?
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Find answers to the most common questions about Quizify and our
            AI-powered learning platform.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="mx-auto max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map(({ id, q, a }, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
              >
                <AccordionItem
                  value={id}
                  className="overflow-hidden rounded-2xl border bg-background/70 backdrop-blur-xl px-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                >
                  <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                    {q}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 leading-7 text-muted-foreground">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}