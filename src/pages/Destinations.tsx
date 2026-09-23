import { ArrowRight, Compass, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/layout/Navbar";
import { cruises } from "../data/cruises";

interface Destination {
  name: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    name: "Caribbean",
    description:
      "Explore turquoise waters, tropical islands, and vibrant coastal cities.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bahamas",
    description:
      "Discover white-sand beaches, clear blue water, and relaxed island escapes.",
    image:
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Alaska",
    description:
      "Experience dramatic glaciers, rugged landscapes, and unforgettable scenery.",
    image:
      "https://images.unsplash.com/photo-1531176175280-2c2e8f6f7a0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Mexico",
    description:
      "Combine coastal adventures, historic cities, and warm Pacific waters.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bermuda",
    description:
      "Sail toward pastel architecture, pink beaches, and beautiful Atlantic waters.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Mediterranean",
    description:
      "Travel through historic ports, coastal cities, and iconic Mediterranean destinations.",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Hawaii",
    description:
      "Island-hop through volcanic landscapes, beaches, and tropical scenery.",
    image:
      "https://images.unsplash.com/photo-1507876466759-dc9d3f8e1e4b?auto=format&fit=crop&w=1200&q=80",
  },
];

function getCruiseCount(destination: string) {
  return cruises.filter((cruise) => cruise.destination === destination).length;
}

export default function Destinations() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      <main>
        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                <Compass size={15} />
                Explore the world
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find your next
                <span className="text-slate-400"> destination.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                From tropical Caribbean islands to the glaciers of Alaska,
                discover cruises designed around the places you want to explore.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Destinations
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Where will you go?
              </h2>
            </div>

            <Link
              to="/search"
              className="hidden items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950 sm:flex"
            >
              View all cruises
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => {
              const cruiseCount = getCruiseCount(destination.name);

              return (
                <Link
                  key={destination.name}
                  to={`/search?destination=${encodeURIComponent(
                    destination.name,
                  )}`}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white/80">
                      <MapPin size={14} />
                      {cruiseCount} {cruiseCount === 1 ? "cruise" : "cruises"}
                    </div>

                    <h3 className="absolute bottom-4 right-4 text-xl font-bold text-white">
                      {destination.name}
                    </h3>
                  </div>

                  <div className="p-5">
                    <p className="text-sm leading-6 text-slate-500">
                      {destination.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">
                        Explore cruises
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-slate-950 group-hover:text-white">
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              to="/search"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white"
            >
              View all cruises
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-[900px] px-5 py-14 text-center sm:px-8 sm:py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Compass size={21} />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Not sure where to start?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              Search by destination, departure port, cruise line, sailing date,
              and more to find a voyage that fits your plans.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Search cruises
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
