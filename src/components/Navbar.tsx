import { useState } from "react";
import {
  CalendarClock,
  Dumbbell,
  House,
  LayoutDashboard,
  Menu,
  SlidersHorizontal,
  X,
  Zap
} from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", icon: House },
  { href: "#planner", label: "Planner", icon: SlidersHorizontal },
  { href: "#workouts", label: "Dashboard", icon: LayoutDashboard },
  { href: "#exercises", label: "Exercises", icon: Dumbbell },
  { href: "#history", label: "History", icon: CalendarClock }
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
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
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            <link.icon size={16} aria-hidden="true" />
            {link.label}
          </a>
        ))}
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
    </header>
  );
}
