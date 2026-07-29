import { Brain, Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="text-primary" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Quizify</h2>
                <p className="text-xs text-muted-foreground">
                  AI Powered Learning Platform
                </p>
              </div>
            </div>

            <p className="max-w-md leading-7 text-muted-foreground">
              Generate AI-powered quizzes, improve your skills, monitor your
              progress, and prepare smarter with one intelligent learning
              platform.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border p-3 transition-all hover:border-primary hover:bg-primary/10"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border p-3 transition-all hover:border-primary hover:bg-primary/10"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border p-3 transition-all hover:border-primary hover:bg-primary/10"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="mailto:example@gmail.com"
                className="rounded-xl border p-3 transition-all hover:border-primary hover:bg-primary/10"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 font-semibold">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="transition hover:text-primary">Features</a></li>
              <li><a href="#" className="transition hover:text-primary">AI Quiz Generator</a></li>
              <li><a href="#" className="transition hover:text-primary">Dashboard</a></li>
              <li><a href="#" className="transition hover:text-primary">Analytics</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="transition hover:text-primary">Documentation</a></li>
              <li><a href="#" className="transition hover:text-primary">FAQ</a></li>
              <li><a href="#" className="transition hover:text-primary">Blog</a></li>
              <li><a href="#" className="transition hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="transition hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="transition hover:text-primary">Cookie Policy</a></li>
              <li><a href="#" className="transition hover:text-primary">Security</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Quizify. All Rights Reserved.</p>

          <p className="flex items-center gap-2">
            Made with
            <Heart size={15} className="fill-red-500 text-red-500" />
            for Learners Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}