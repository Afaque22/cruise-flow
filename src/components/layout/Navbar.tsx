import { Menu, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import headerLogo from "../assets/header-logo.png";

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isExploreActive = location.pathname === "/search";

  const isDestinationActive =
    location.pathname === "/search" &&
    new URLSearchParams(location.search).has("destination");

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center"
        >
          <img
            src={headerLogo}
            alt="CruiseFlow - Your voyage starts here"
            className="h-14 w-[320px] object-cover object-left transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/search"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isExploreActive && !isDestinationActive
                ? "bg-white/10 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Explore
          </Link>

          <Link
            to="/destinations"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              location.pathname === "/destinations"
                ? "bg-white/10 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Destinations
          </Link>

          <Link
            to="/deals"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              location.pathname === "/deals"
                ? "bg-white/10 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Deals
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/search"
            className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
          >
            <Search size={16} />
            Search cruises
          </Link>
        </div>

        <button
          type="button"
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
            <div className="flex flex-col gap-1">
              <Link
                to="/search"
                onClick={closeMobileMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isExploreActive && !isDestinationActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Explore
              </Link>

              <Link
                to="/destinations"
                onClick={closeMobileMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  location.pathname === "/destinations"
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Destinations
              </Link>

              <Link
                to="/deals"
                onClick={closeMobileMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  location.pathname === "/deals"
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Deals
              </Link>

              <Link
                to="/search"
                onClick={closeMobileMenu}
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
              >
                <Search size={16} />
                Search cruises
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
