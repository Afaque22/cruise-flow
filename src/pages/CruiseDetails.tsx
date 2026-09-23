import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Ship as ShipIcon,
  Star,
  Users,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

import { Navbar } from "../components/layout/Navbar";
import { getCruiseById } from "../services/cruiseService";
import type { CabinType, Cruise } from "../types/cruise";

export function CruiseDetails() {
  const { cruiseId } = useParams();

  const cruise = cruiseId ? getCruiseById(cruiseId) : undefined;

  if (!cruise) {
    return <CruiseNotFound />;
  }

  return <CruiseDetailsContent cruise={cruise} />;
}

interface CruiseDetailsContentProps {
  cruise: Cruise;
}

function CruiseDetailsContent({ cruise }: CruiseDetailsContentProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialDate = searchParams.get("date") || cruise.departureDates[0];

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const cabinPrice = cruise.cabinPrices[0]?.price ?? cruise.priceFrom;

  function handleSelectCabin() {
    navigate(
      `/cruises/${cruise.id}/cabin?date=${encodeURIComponent(selectedDate)}`,
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <Navbar />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-5 sm:px-6 lg:px-8 lg:pb-12 lg:pt-7">
            <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link to="/" className="transition hover:text-slate-900">
                Home
              </Link>

              <span>/</span>

              <Link to="/search" className="transition hover:text-slate-900">
                Cruises
              </Link>

              <span>/</span>

              <span className="max-w-[180px] truncate text-slate-600">
                {cruise.name}
              </span>
            </div>

            <div className="grid overflow-hidden rounded-[30px] bg-slate-950 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[520px]">
                <img
                  src={cruise.image}
                  alt={`${cruise.name} - ${cruise.ship.name}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                <Link
                  to="/search"
                  className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6 sm:top-6"
                >
                  <ArrowLeft size={15} />
                  Back to cruises
                </Link>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                      {cruise.cruiseLine}
                    </span>

                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                      {cruise.duration} nights
                    </span>
                  </div>

                  <h1 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {cruise.name}
                  </h1>

                  <p className="mt-2 text-sm font-medium text-white/75 sm:text-base">
                    {cruise.ship.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 text-white sm:p-8 lg:p-10">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <Star size={17} className="fill-current text-amber-400" />

                      <span className="text-sm font-bold">
                        {cruise.rating.toFixed(1)}
                      </span>
                    </div>

                    <span className="text-sm text-white/50">
                      ({cruise.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-white/65">
                    {cruise.description}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <HeroFact
                      icon={<ShipIcon size={16} />}
                      label="Ship"
                      value={cruise.ship.name}
                    />

                    <HeroFact
                      icon={<MapPin size={16} />}
                      label="Destination"
                      value={cruise.destination}
                    />

                    <HeroFact
                      icon={<Clock3 size={16} />}
                      label="Duration"
                      value={`${cruise.duration} nights`}
                    />

                    <HeroFact
                      icon={<Users size={16} />}
                      label="Guests"
                      value={cruise.ship.guests.toLocaleString()}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                    From
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-3xl font-black">
                        ${cruise.priceFrom.toLocaleString()}
                      </span>

                      <span className="ml-2 text-xs text-white/50">
                        per guest
                      </span>
                    </div>

                    <span className="text-xs text-white/50">
                      Taxes may apply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 space-y-8">
              <SailingDateSection
                cruise={cruise}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />

              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.05)] sm:p-7">
                <SectionHeader
                  eyebrow="Your journey"
                  title="Itinerary"
                  description="See where your cruise takes you each day."
                />

                <div className="mt-7">
                  {cruise.itinerary.map((day, index) => (
                    <div
                      key={`${day.day}-${day.port}`}
                      className="relative flex gap-4 pb-8 last:pb-0"
                    >
                      <div className="flex w-10 shrink-0 flex-col items-center">
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                          {day.day}
                        </div>

                        {index !== cruise.itinerary.length - 1 && (
                          <div className="absolute bottom-0 top-10 w-px bg-slate-200" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-950">
                              {day.port}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                              {day.arrival && (
                                <span>Arrives {day.arrival}</span>
                              )}

                              {day.departure && (
                                <span>Departs {day.departure}</span>
                              )}
                            </div>
                          </div>

                          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Day {day.day}
                          </span>
                        </div>

                        {day.description && (
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                            {day.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <ShipInfo ship={cruise.ship} />

              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.05)] sm:p-7">
                <SectionHeader
                  eyebrow="On board"
                  title="Amenities"
                  description="Included facilities and experiences available on the ship."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {cruise.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                        <Check size={15} />
                      </span>

                      <span className="text-sm font-semibold text-slate-700">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.05)] sm:p-7">
                <SectionHeader
                  eyebrow="Accommodation"
                  title="Choose your cabin"
                  description="Compare cabin categories before selecting your room."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {cruise.cabinPrices.map((cabin) => (
                    <CabinCategoryCard
                      key={cabin.type}
                      type={cabin.type}
                      price={cabin.price}
                    />
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-[88px]">
              <BookingCard
                cruise={cruise}
                selectedDate={selectedDate}
                cabinPrice={cabinPrice}
                onSelectCabin={handleSelectCabin}
              />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

interface SailingDateSectionProps {
  cruise: Cruise;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

function SailingDateSection({
  cruise,
  selectedDate,
  onDateChange,
}: SailingDateSectionProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.05)] sm:p-7">
      <SectionHeader
        eyebrow="Departure"
        title="Choose your sailing"
        description="Select a departure date for this itinerary."
      />

      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {cruise.departureDates.map((date) => {
          const active = date === selectedDate;

          return (
            <button
              key={date}
              type="button"
              onClick={() => onDateChange(date)}
              aria-pressed={active}
              className={`min-w-[150px] rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.12em] ${
                  active ? "text-white/50" : "text-slate-400"
                }`}
              >
                Departure
              </p>

              <p className="mt-2 text-sm font-black">{formatDate(date)}</p>

              <p
                className={`mt-1 text-xs ${
                  active ? "text-white/60" : "text-slate-400"
                }`}
              >
                {cruise.duration} nights
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

interface ShipInfoProps {
  ship: Cruise["ship"];
}

function ShipInfo({ ship }: ShipInfoProps) {
  const facts = [
    {
      label: "Year built",
      value: String(ship.yearBuilt),
    },
    {
      label: "Guests",
      value: ship.guests.toLocaleString(),
    },
    {
      label: "Crew",
      value: ship.crew.toLocaleString(),
    },
    {
      label: "Decks",
      value: String(ship.decks),
    },
    {
      label: "Length",
      value: `${ship.length.toLocaleString()} ft`,
    },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.05)] sm:p-7">
      <SectionHeader
        eyebrow="The ship"
        title={ship.name}
        description="Key information about your cruise ship."
      />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
              {fact.label}
            </p>

            <p className="mt-1.5 text-sm font-black text-slate-900">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

interface CabinCategoryCardProps {
  type: CabinType;
  price: number;
}

function CabinCategoryCard({ type, price }: CabinCategoryCardProps) {
  const labels: Record<CabinType, string> = {
    interior: "Interior",
    oceanview: "Ocean View",
    balcony: "Balcony",
    suite: "Suite",
  };

  const descriptions: Record<CabinType, string> = {
    interior: "A comfortable cabin without an outside view.",
    oceanview: "Enjoy natural light and ocean views through a window.",
    balcony: "Private outdoor space with your own balcony.",
    suite: "More space, enhanced comfort and premium amenities.",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-slate-950">{labels[type]}</h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {descriptions[type]}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] font-semibold uppercase text-slate-400">
            From
          </p>

          <p className="mt-0.5 text-sm font-black text-slate-950">
            ${price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

interface BookingCardProps {
  cruise: Cruise;
  selectedDate: string;
  cabinPrice: number;
  onSelectCabin: () => void;
}

function BookingCard({
  cruise,
  selectedDate,
  cabinPrice,
  onSelectCabin,
}: BookingCardProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
          Your sailing
        </p>

        <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
          {cruise.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{cruise.ship.name}</p>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Departure */}

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <CalendarIcon />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
              Departure
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {formatDate(selectedDate)}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {cruise.departurePort}
            </p>
          </div>
        </div>

        {/* Destination */}

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <MapPin size={16} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
              Destination
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {cruise.destination}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {cruise.duration} nights
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Starting from
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                ${cabinPrice.toLocaleString()}
              </p>

              <p className="mt-0.5 text-xs text-slate-400">per guest</p>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
              <Star size={13} className="fill-amber-400 text-amber-400" />

              {cruise.rating.toFixed(1)}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSelectCabin}
          className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.99]"
        >
          Select a cabin
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>

        <p className="text-center text-[11px] leading-5 text-slate-400">
          Select your cabin and continue to guest details.
        </p>
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {eyebrow}
      </p>

      <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>

      <p className="mt-1.5 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

interface HeroFactProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function HeroFact({ icon, label, value }: HeroFactProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
      <div className="flex items-center gap-2 text-white/45">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-bold text-white">{value}</p>
    </div>
  );
}

function CruiseNotFound() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <Navbar />

      <main className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <ShipIcon size={28} className="text-slate-400" />
          </div>

          <h1 className="mt-6 text-2xl font-black">Cruise not found</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The cruise you're looking for doesn't exist or is no longer
            available.
          </p>

          <Link
            to="/search"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Browse cruises
          </Link>
        </div>
      </main>
    </div>
  );
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />

      <line x1="16" x2="16" y1="2" y2="6" />

      <line x1="8" x2="8" y1="2" y2="6" />

      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
