import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  MapPin,
  Ship,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/layout/Navbar";
import { cruises } from "../data/cruises";

const dealCruiseIds = [
  "bahamas-getaway",
  "bahamas-sunrise",
  "mexico-coastal-escape",
  "bermuda-escape",
  "caribbean-escape",
  "mexico-pacific",
];

const dealDiscounts: Record<string, number> = {
  "bahamas-getaway": 25,
  "bahamas-sunrise": 20,
  "mexico-coastal-escape": 18,
  "bermuda-escape": 15,
  "caribbean-escape": 12,
  "mexico-pacific": 10,
};

const dealCruises = cruises.filter((cruise) =>
  dealCruiseIds.includes(cruise.id),
);

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getDiscountedPrice(price: number, discount: number) {
  return Math.round(price * (1 - discount / 100));
}

export default function Deals() {
  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Navbar />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                <BadgePercent size={14} />
                Cruise deals
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                More voyage.
                <br />
                <span className="text-slate-400">Less to pay.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover selected sailings with special offers across popular
                cruise destinations. Find a deal, choose your cabin, and get
                ready to sail.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/search"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Browse all cruises
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/destinations"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Explore destinations
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-950">
          <div className="mx-auto grid max-w-[1440px] sm:grid-cols-3">
            <DealHighlight
              icon={<BadgePercent size={18} />}
              title="Up to 25% off"
              description="Selected sailings"
            />

            <DealHighlight
              icon={<Ship size={18} />}
              title="6 featured cruises"
              description="Across multiple destinations"
            />

            <DealHighlight
              icon={<MapPin size={18} />}
              title="Popular destinations"
              description="Caribbean, Bahamas & more"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:py-14">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Limited offers
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Featured deals
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Handpicked sailings with reduced fares.
              </p>
            </div>

            <Link
              to="/search"
              className="hidden items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 sm:flex"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dealCruises.map((cruise) => (
              <DealCard
                key={cruise.id}
                cruise={cruise}
                discount={dealDiscounts[cruise.id] ?? 10}
              />
            ))}
          </div>

          <Link
            to="/search"
            className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:hidden"
          >
            View all cruises
            <ArrowRight size={16} />
          </Link>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Where to go
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Deals by destination
              </h2>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DestinationDeal
                name="Caribbean"
                description="Tropical islands and turquoise waters."
                image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80"
              />

              <DestinationDeal
                name="Bahamas"
                description="White beaches and clear island waters."
                image="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=900&q=80"
              />

              <DestinationDeal
                name="Mexico"
                description="Coastal adventures and vibrant ports."
                image="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=80"
              />

              <DestinationDeal
                name="Bermuda"
                description="Pastel shores and Atlantic escapes."
                image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f6f7f9]">
          <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-slate-950 p-7 sm:p-9 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Can't find what you're looking for?
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Search every available sailing.
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Filter cruises by destination, departure port, cruise line,
                  date, ship, duration, and price.
                </p>
              </div>

              <Link
                to="/search"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Search cruises
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function DealHighlight({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:last:border-r-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-white">{title}</p>

        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function DealCard({
  cruise,
  discount,
}: {
  cruise: (typeof cruises)[number];
  discount: number;
}) {
  const selectedDate = cruise.departureDates[0];

  const discountedPrice = getDiscountedPrice(cruise.priceFrom, discount);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Image */}

      <div className="relative h-56 overflow-hidden">
        <img
          src={cruise.image}
          alt={cruise.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-950 shadow-lg">
            <BadgePercent size={13} />
            {discount}% off
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-medium text-white/75">
            {cruise.cruiseLine}
          </p>

          <h3 className="mt-1 text-xl font-bold text-white">{cruise.name}</h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Ship size={15} />

          <span>{cruise.ship.name}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {cruise.departurePort}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} />
            {formatDate(selectedDate)}
          </span>

          <span>{cruise.duration} nights</span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <Star size={14} fill="currentColor" className="text-slate-700" />

          <span className="font-semibold text-slate-800">{cruise.rating}</span>

          <span className="text-slate-400">({cruise.reviewCount} reviews)</span>
        </div>

        <div className="my-5 h-px bg-slate-100" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">
              Was ${cruise.priceFrom.toLocaleString()}
            </p>

            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-950">
                ${discountedPrice.toLocaleString()}
              </span>

              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>

          <Link
            to={`/cruises/${cruise.id}?date=${encodeURIComponent(
              selectedDate,
            )}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-slate-950 px-4 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            View deal
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function DestinationDeal({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) {
  return (
    <Link
      to={`/search?destination=${encodeURIComponent(name)}`}
      className="group relative h-48 overflow-hidden rounded-2xl"
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-bold text-white">{name}</h3>

        <p className="mt-1 text-xs leading-5 text-white/70">{description}</p>
      </div>
    </Link>
  );
}
