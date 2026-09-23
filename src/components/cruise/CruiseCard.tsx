import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Ship,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Cruise } from "../../types/cruise";

interface CruiseCardProps {
  cruise: Cruise;
  selectedDate?: string;
}

export function CruiseCard({ cruise, selectedDate }: CruiseCardProps) {
  const departureDate = selectedDate || cruise.departureDates[0];

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <div className="relative h-56 overflow-hidden lg:h-full">
          <img
            src={cruise.image}
            alt={cruise.name}
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
            {cruise.duration} nights
          </div>
        </div>

        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              {cruise.cruiseLine}
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              {cruise.name}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Ship size={15} />

              <span>{cruise.ship.name}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <MapPin size={16} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Departure
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {cruise.departurePort}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <CalendarDays size={16} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Sailing date
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {formatDate(departureDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-slate-950 px-2 py-1 text-xs font-bold text-white">
              <Star size={12} fill="currentColor" />

              {cruise.rating}
            </div>

            <span className="text-xs text-slate-500">
              {cruise.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock3 size={14} />

                <span className="text-xs">{cruise.duration} nights</span>
              </div>

              <p className="mt-1">
                <span className="text-xs text-slate-400">From </span>

                <span className="text-2xl font-bold tracking-tight text-slate-950">
                  ${cruise.priceFrom.toLocaleString()}
                </span>

                <span className="text-xs text-slate-400"> / person</span>
              </p>
            </div>

            <Link
              to={`/cruises/${cruise.id}${
                selectedDate ? `?date=${encodeURIComponent(selectedDate)}` : ""
              }`}
              className="group/button inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View cruise
              <ArrowRight
                size={16}
                className="transition-transform group-hover/button:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatDate(value?: string): string {
  if (!value) {
    return "Select date";
  }

  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
