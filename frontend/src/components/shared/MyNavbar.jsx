// ===============================================================
// File: MyNavbar.jsx
// Description: Modern Responsive Navbar
// Project: AI Role Quiz Generator
// ===============================================================

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { Button } from "../ui/button";
import { useTheme } from "next-themes";

import {
  BrainCircuit,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useAuthContext } from "../../context/AuthContext";

function MyNavbar() {
  // ==============================
  // Theme
  // ==============================

  const { theme, setTheme } = useTheme();

  // ==============================
  // Authentication
  // ==============================

  const { user, logout } = useAuthContext();

  // ==============================
  // Router
  // ==============================

  const navigate = useNavigate();
  const location = useLocation();

  // ==============================
  // States
  // ==============================

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ==============================
  // Theme Toggle
  // ==============================

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // ==============================
  // Logout
  // ==============================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ==============================
  // Close mobile menu on route change
  // ==============================

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ==============================
  // Sticky Navbar
  // ==============================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==============================
  // Public Links
  // ==============================

  const publicLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "/features",
    },
  ];

  // ==============================
  // Private Links
  // ==============================

  const privateLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ];

  // ==============================
  // Active Link Helper
  // ==============================

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };
  // ==============================
  // Navigation Link Component
  // ==============================

  const NavLink = ({ item }) => {
    const active = isActive(item.href);

    return (
      <Link
        to={item.href}
        className={`relative font-medium transition-all duration-300

        ${
          active ? "text-primary" : "text-muted-foreground hover:text-primary"
        }`}
      >
        {item.title}

        {active && (
          <motion.span
            layoutId="active-navbar"
            className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-primary"
          />
        )}
      </Link>
    );
  };

  // ==============================
  // JSX Starts Here
  // ==============================

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300

      ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          {/* ===========================
              Logo
          =========================== */}

          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-primary
              text-primary-foreground
              shadow-lg
              transition-transform
              duration-300
              group-hover:scale-110"
            >
              <BrainCircuit className="h-6 w-6" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold">Quizify</span>

              <span className="text-xs text-muted-foreground">
                AI Powered Assessment
              </span>
            </div>
          </Link>

          {/* ===========================
              Desktop Navigation
          =========================== */}

          <div className="hidden lg:flex items-center gap-8">
            {!user &&
              publicLinks.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}

            {user &&
              privateLinks.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
          </div>
          {/* ===========================
              Right Side Actions
          =========================== */}

          <div className="flex items-center gap-3">
            {/* ===========================
                Theme Toggle
            =========================== */}

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* ===========================
                Logged In User
            =========================== */}

            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>

                <div className="hidden xl:flex flex-col">
                  <span className="font-semibold">{user?.name || "User"}</span>

                  <span className="text-xs text-muted-foreground">
                    Welcome Back
                  </span>
                </div>

                <Button
                  variant="destructive"
                  className="rounded-xl"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="rounded-xl"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  className="rounded-xl shadow-lg"
                  onClick={() => navigate("/signup")}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </div>
            )}

            {/* ===========================
                Mobile Menu Button
            =========================== */}

            <Button
              variant="outline"
              size="icon"
              className="lg:hidden rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ===========================
            Mobile Drawer
        =========================== */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="
                lg:hidden
                mt-4
                rounded-2xl
                border
                bg-background/95
                backdrop-blur-xl
                shadow-xl
                overflow-hidden
              "
            >
              <div className="flex flex-col gap-2 p-5">
                {/* ===========================
                    Navigation Links
                =========================== */}

                {!user &&
                  publicLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`rounded-xl px-4 py-3 font-medium transition-all duration-300
                      ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}

                {user &&
                  privateLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`rounded-xl px-4 py-3 font-medium transition-all duration-300
                      ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}

                <div className="my-2 border-t" />

                {/* ===========================
                    Mobile Authentication
                =========================== */}

                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl"
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full justify-start rounded-xl"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>

                    <Button
                      className="w-full rounded-xl"
                      onClick={() => navigate("/signup")}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default MyNavbar;
