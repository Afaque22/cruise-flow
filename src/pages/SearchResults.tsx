import {
  CalendarDays,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getAvailableCruiseLines,
  getAvailableDestinations,
  getAvailablePorts,
  searchCruises,
} from "../services/cruiseService";
import { CruiseCard } from "../components/cruise/CruiseCard";
import { CruiseFilters } from "../components/cruise/CruiseFilters";
import { CruiseSort, type SortOption } from "../components/cruise/CruiseSort";
import type { Cruise } from "../types/cruise";
import type { CruiseSearchParams } from "../types/search";
import { Navbar } from "../components/layout/Navbar";

const durationOptions = [
  {
    value: "1-2",
    label: "1–2 nights",
  },
  {
    value: "3-5",
    label: "3–5 nights",
  },
  {
    value: "6-8",
    label: "6–8 nights",
  },
  {
    value: "9-11",
    label: "9–11 nights",
  },
  {
    value: "12+",
    label: "12+ nights",
  },
];

type FilterState = {
  destination: string;
  departurePort: string;
  date: string;
  cruiseLine: string;
  ship: string;
  duration: string;
  minPrice: string;
  maxPrice: string;
  guests: number;
};

export function SearchResults() {
  const [searchParams] = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [sort, setSort] = useState<SortOption>("recommended");

  /*
   * URL is only used to initialize the filters.
   * After initialization, all filtering is handled locally.
   */
  const [filters, setFilters] = useState<FilterState>(() => ({
    destination: searchParams.get("destination") || "",
    departurePort: searchParams.get("port") || "",
    date: searchParams.get("date") || "",
    cruiseLine: searchParams.get("line") || "",
    ship: searchParams.get("ship") || "",
    duration: searchParams.get("duration") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    guests: Number(searchParams.get("guests")) || 2,
  }));

  const {
    destination,
    departurePort,
    date,
    cruiseLine,
    ship,
    duration,
    minPrice,
    maxPrice,
    guests,
  } = filters;

  const query: CruiseSearchParams = {
    destination: destination || undefined,
    departurePort: departurePort || undefined,
    date: date || undefined,
    cruiseLine: cruiseLine || undefined,
    ship: ship || undefined,
    duration: duration || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    guests,
  };

  const results = searchCruises(query);

  const destinations = getAvailableDestinations();

  const ports = getAvailablePorts(destination || undefined);

  const cruiseLines = getAvailableCruiseLines(
    destination || undefined,
    departurePort || undefined,
  );

  const sortedResults = sortCruises(results, sort);

  function updateFilter(key: keyof FilterState, value: string) {
    setFilters((prev) => {
      const next = { ...prev };

      if (prev[key] === value) {
        next[key] = "" as never;
      } else {
        next[key] = value as never;
      }

      if (key === "destination") {
        next.departurePort = "";
        next.cruiseLine = "";
        next.ship = "";
        next.date = "";
      }

      if (key === "departurePort") {
        next.cruiseLine = "";
        next.ship = "";
        next.date = "";
      }

      if (key === "cruiseLine") {
        next.ship = "";
        next.date = "";
      }

      if (key === "ship") {
        next.date = "";
      }

      return next;
    });
  }

  function updatePriceFilter(key: "minPrice" | "maxPrice", value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function clearFilters() {
    setFilters((prev) => ({
      destination: "",
      departurePort: "",
      date: "",
      cruiseLine: "",
      ship: "",
      duration: "",
      minPrice: "",
      maxPrice: "",
      guests: prev.guests,
    }));
  }

  const activeFilterCount = [
    destination,
    departurePort,
    date,
    cruiseLine,
    ship,
    duration,
    minPrice,
    maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-1440px px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link to="/" className="transition hover:text-slate-700">
            Home
          </Link>

          <ChevronRight size={13} />

          <span className="text-slate-600">Cruise search</span>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.06)]">
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-7 items-center rounded-full bg-slate-100 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Cruise search
                  </span>

                  <span className="text-xs text-slate-400">
                    {results.length}{" "}
                    {results.length === 1 ? "result" : "results"}
                  </span>
                </div>

                <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-[34px]">
                  {buildTitle(destination, departurePort)}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Explore available sailings and find the itinerary that fits
                  your trip.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {destination && (
                  <SearchSummaryItem
                    icon={<MapPin size={15} />}
                    label={destination}
                  />
                )}

                {departurePort && (
                  <SearchSummaryItem
                    icon={<MapPin size={15} />}
                    label={departurePort}
                  />
                )}

                {date && (
                  <SearchSummaryItem
                    icon={<CalendarDays size={15} />}
                    label={formatDate(date)}
                  />
                )}

                <SearchSummaryItem
                  icon={<Users size={15} />}
                  label={`${guests} ${guests === 1 ? "guest" : "guests"}`}
                />
              </div>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 sm:px-7 lg:px-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold text-slate-400">
                  Active filters
                </span>

                {[
                  destination,
                  departurePort,
                  date && formatDate(date),
                  cruiseLine,
                  ship,
                  duration &&
                    durationOptions.find((item) => item.value === duration)
                      ?.label,
                  minPrice && `From $${Number(minPrice).toLocaleString()}`,
                  maxPrice && `Up to $${Number(maxPrice).toLocaleString()}`,
                ]
                  .filter(Boolean)
                  .map((filter, index) => (
                    <span
                      key={`${filter}-${index}`}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {filter}
                    </span>
                  ))}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-xs font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden self-start lg:block">
            <div className="sticky top-88px h-fit">
              <CruiseFilters
                destinations={destinations}
                ports={ports}
                cruiseLines={cruiseLines}
                durations={durationOptions}
                destination={destination}
                departurePort={departurePort}
                cruiseLine={cruiseLine}
                duration={duration}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onDestinationChange={(value) =>
                  updateFilter("destination", value)
                }
                onDeparturePortChange={(value) =>
                  updateFilter("departurePort", value)
                }
                onCruiseLineChange={(value) =>
                  updateFilter("cruiseLine", value)
                }
                onDurationChange={(value) => updateFilter("duration", value)}
                onMinPriceChange={(value) =>
                  updatePriceFilter("minPrice", value)
                }
                onMaxPriceChange={(value) =>
                  updatePriceFilter("maxPrice", value)
                }
                onClear={clearFilters}
              />
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-950">
                  {results.length} {results.length === 1 ? "cruise" : "cruises"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Showing available sailings
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
                >
                  <Filter size={15} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1.5 text-[10px] text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <CruiseSort value={sort} onChange={setSort} />
              </div>
            </div>

            {sortedResults.length > 0 ? (
              <div className="space-y-5">
                {sortedResults.map((cruise) => (
                  <CruiseCard
                    key={cruise.id}
                    cruise={cruise}
                    selectedDate={date || undefined}
                  />
                ))}
              </div>
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </section>
        </div>
      </main>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[92vh] overflow-y-auto rounded-t-[30px] bg-[#f7f8fa] shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-xl">
              <div className="mx-auto flex max-w-xl items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-950">Filters</h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Refine your cruise search
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="mx-auto max-w-xl p-4">
              <CruiseFilters
                destinations={destinations}
                ports={ports}
                cruiseLines={cruiseLines}
                durations={durationOptions}
                destination={destination}
                departurePort={departurePort}
                cruiseLine={cruiseLine}
                duration={duration}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onDestinationChange={(value) =>
                  updateFilter("destination", value)
                }
                onDeparturePortChange={(value) =>
                  updateFilter("departurePort", value)
                }
                onCruiseLineChange={(value) =>
                  updateFilter("cruiseLine", value)
                }
                onDurationChange={(value) => updateFilter("duration", value)}
                onMinPriceChange={(value) =>
                  updatePriceFilter("minPrice", value)
                }
                onMaxPriceChange={(value) =>
                  updatePriceFilter("maxPrice", value)
                }
                onClear={clearFilters}
              />

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-4 flex h-13 w-full items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800"
              >
                Show {results.length}{" "}
                {results.length === 1 ? "cruise" : "cruises"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SearchSummaryItemProps {
  icon: React.ReactNode;
  label: string;
}

function SearchSummaryItem({ icon, label }: SearchSummaryItemProps) {
  return (
    <div className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-600">
      <span className="text-slate-400">{icon}</span>

      {label}
    </div>
  );
}

interface EmptyStateProps {
  onClear: () => void;
}

function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
      <div className="flex min-h-460px flex-col items-center justify-center px-6 py-16 text-center">
        <div className="relative">
          <div className="absolute inset-0 scale-150 rounded-full bg-slate-100 blur-2xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-24px border border-slate-200 bg-white text-slate-400 shadow-sm">
            <Search size={28} />
          </div>
        </div>

        <h2 className="mt-7 text-xl font-black text-slate-950">
          No cruises found
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          We couldn't find any cruises matching your current search. Try
          changing your dates, destination, or filters.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}

function sortCruises(cruises: Cruise[], sort: SortOption): Cruise[] {
  const sorted = [...cruises];

  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);

    case "price-high":
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);

    case "duration-short":
      return sorted.sort((a, b) => a.duration - b.duration);

    case "duration-long":
      return sorted.sort((a, b) => b.duration - a.duration);

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "recommended":
    default:
      return sorted.sort((a, b) => {
        const scoreA = a.rating * 10 - a.priceFrom / 1000;

        const scoreB = b.rating * 10 - b.priceFrom / 1000;

        return scoreB - scoreA;
      });
  }
}

function buildTitle(destination: string, departurePort: string): string {
  if (destination && departurePort) {
    return `${destination} cruises from ${departurePort}`;
  }

  if (destination) {
    return `${destination} cruises`;
  }

  if (departurePort) {
    return `Cruises from ${departurePort}`;
  }

  return "Find your next cruise";
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
