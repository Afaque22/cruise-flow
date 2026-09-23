import {
  ArrowRight,
  Check,
  Compass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Navbar } from "../components/layout/Navbar";
import { CruiseSearch } from "../components/search/CruiseSearch";
import { cruises } from "../data/cruises";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const destinations = [
  {
    name: "Caribbean",
    description: "Turquoise waters and tropical islands",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Alaska",
    description: "Glaciers, wildlife and wild landscapes",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
  },
  {
    name: "Mediterranean",
    description: "Historic cities and coastal escapes",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
  },
  {
    name: "Bahamas",
    description: "Short island escapes",
    image: "https://images.unsplash.com/photo-1544550285-f813152fb2fd",
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-slate-950">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5')",
            }}
          />

          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-24 sm:px-6 lg:pb-40 lg:pt-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Sparkles size={15} />
                Discover your next voyage
              </div>

              <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find a cruise
                <br />
                worth remembering.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Compare destinations, cruise lines, itineraries and cabins to
                find the right journey for your next adventure.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-24 max-w-7xl px-5 sm:px-6">
          <CruiseSearch />
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <SectionHeader
            eyebrow="EXPLORE"
            title="Popular destinations"
            description="Start with somewhere you want to go."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                to={`/search?destination=${encodeURIComponent(destination.name)}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to from-black/50 to-transparent" />

                  <h3 className="absolute bottom-5 left-5 text-xl font-bold text-white">
                    {destination.name}
                  </h3>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-slate-500">
                    {destination.description}
                  </p>

                  <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Explore
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <SectionHeader
              eyebrow="FEATURED"
              title="Cruises worth discovering"
              description="A few journeys to get you started."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {cruises.map((cruise) => (
                <article
                  key={cruise.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-xl"
                >
                  <Link to={`/cruises/${cruise.id}`}>
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={cruise.image}
                        alt={cruise.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
                        {cruise.duration} nights
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm font-medium text-slate-500">
                        {cruise.cruiseLine}
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-slate-900">
                        {cruise.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        {cruise.ship.name} · {cruise.departurePort}
                      </p>

                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-slate-400">From</p>

                          <p className="text-2xl font-bold text-slate-950">
                            ${cruise.priceFrom.toLocaleString()}
                          </p>

                          <p className="text-xs text-slate-400">per guest</p>
                        </div>

                        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                          ★ {cruise.rating}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore all cruises
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <SectionHeader
              eyebrow="WHY CRUISEFLOW"
              title="Booking made simpler"
              description="Everything you need to go from inspiration to itinerary."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <Feature
                icon={<Compass />}
                title="Compare with confidence"
                description="Search across destinations, dates and cruise lines in one place."
              />

              <Feature
                icon={<Sparkles />}
                title="Choose your cabin"
                description="Explore available cabins and select the one that fits your trip."
              />

              <Feature
                icon={<ShieldCheck />}
                title="Simple checkout"
                description="Review your trip and complete the booking in a clear multi-step flow."
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-slate-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-slate-950">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>

      <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-600">
        <Check size={14} />
        Designed for a smoother journey
      </div>
    </div>
  );
}
