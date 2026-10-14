import { useState } from "react";
import {
  CalendarClock,
  Download,
  Dumbbell,
  House,
  LayoutDashboard,
  Menu,
  SlidersHorizontal,
  X,
  Zap
} from "lucide-react";

import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useToast } from "../hooks/useToast";
import { ScrollProgress } from "./ScrollProgress";

const navLinks = [
  { href: "#home", id: "home", label: "Home", icon: House },
  { href: "#planner", id: "planner", label: "Planner", icon: SlidersHorizontal },
  { href: "#workouts", id: "workouts", label: "Dashboard", icon: LayoutDashboard },
  { href: "#exercises", id: "exercises", label: "Exercises", icon: Dumbbell },
  { href: "#history", id: "history", label: "History", icon: CalendarClock }
];

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const activeSection = useScrollSpy(sectionIds);
  const { y } = useScrollProgress();
  const scrolled = y > 12;

  const { notify } = useToast();
  const { canPrompt, isIos, installed, promptInstall } = useInstallPrompt();

  // Offer installation until the app already runs as an installed PWA.
  const showInstall = !installed && (canPrompt || isIos);

  const handleInstall = async () => {
    if (!canPrompt) {
      notify('Tap Share, then "Add to Home Screen".', "info");
      return;
    }

    const outcome = await promptInstall();

    notify(
      outcome === "accepted"
        ? "Installing FitZone — it will appear on your home screen"
        : "Install dismissed — you can install anytime from the navbar",
      outcome === "accepted" ? "success" : "info"
    );
  };

  return (
    <header className={`navbar${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="FitZone home" onClick={closeMenu}>
        <span className="brand-icon">
          <Zap size={20} aria-hidden="true" />
        </span>
        <span className="brand-text">
          Fit<span>Zone</span>
        </span>
      </a>

      <nav
        className={`nav-links${menuOpen ? " open" : ""}`}
        aria-label="Main navigation"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;

          return (
            <a
              key={link.href}
              href={link.href}
              className={isActive ? "active" : undefined}
              aria-current={isActive ? "true" : undefined}
              onClick={closeMenu}
            >
              <link.icon size={16} aria-hidden="true" />
              {link.label}
            </a>
          );
        })}
        <a
          className="button-primary nav-cta nav-cta-mobile"
          href="#planner"
          onClick={closeMenu}
        >
          <Dumbbell size={16} aria-hidden="true" />
          Start Training
        </a>
      </nav>

      <div className="navbar-actions">
        {showInstall && (
          <button
            type="button"
            className="nav-install"
            aria-label="Install FitZone app"
            onClick={handleInstall}
          >
            <Download size={16} aria-hidden="true" />
            <span>Install</span>
          </button>
        )}

        <a className="button-primary nav-cta" href="#planner">
          <Dumbbell size={16} aria-hidden="true" />
          Start Training
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <ScrollProgress />
    </header>
  );
}
