import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 sm:px-6 md:flex-row md:items-center">
        <div>
          <p className="text-lg font-bold">CruiseFlow</p>

          <p className="mt-1 text-sm text-slate-400">Find your next voyage.</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-slate-400">
          <Link to="/search" className="hover:text-white">
            Explore
          </Link>

          <Link to="/about" className="hover:text-white">
            About
          </Link>

          <Link to="/support" className="hover:text-white">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
