import {
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  Gift,
  Ship,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const promotions = [
  {
    title: "Christmas Cruise Offers",
    description:
      "Celebrate the holidays at sea with special offers on selected Christmas sailings.",
    details: "Selected December sailings",
    icon: Gift,
    image:
      "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Summer Escape",
    description:
      "Plan your next summer getaway with special offers across popular Caribbean and Bahamas sailings.",
    details: "Selected summer departures",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Early Booking Offers",
    description:
      "Planning ahead? Explore selected sailings with promotional fares available for early bookings.",
    details: "Limited selected sailings",
    icon: CalendarDays,
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Caribbean Specials",
    description:
      "Discover island escapes across some of the most popular Caribbean destinations.",
    details: "Caribbean departures",
    icon: Ship,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

const benefits = [
  {
    title: "Seasonal promotions",
    description: "Special offers available on selected sailings.",
  },
  {
    title: "Popular destinations",
    description: "Discover offers across popular cruise destinations.",
  },
  {
    title: "Multiple cruise lines",
    description: "Explore promotions across leading cruise operators.",
  },
  {
    title: "Flexible departures",
    description: "Find sailings across a range of travel dates.",
  },
];

export default function Deals() {
  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                <BadgePercent size={14} />
                Seasonal offers
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Special offers.
                <br />
                <span className="text-slate-400">More reasons to sail.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover seasonal promotions and special offers across selected
                cruise sailings and popular destinations.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-950">
          <div className="mx-auto grid max-w-[1440px] sm:grid-cols-3">
            <OfferHighlight
              icon={<BadgePercent size={18} />}
              title="Seasonal savings"
              description="Special offers on selected sailings"
            />

            <OfferHighlight
              icon={<Ship size={18} />}
              title="Popular cruise lines"
              description="Promotions across leading operators"
            />

            <OfferHighlight
              icon={<CalendarDays size={18} />}
              title="Selected departures"
              description="Offers vary by sailing and date"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Current promotions
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Offers for your next voyage
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse our featured seasonal promotions and keep an eye out for
              special offers on selected sailings.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.title} {...promotion} />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Why cruise with us
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Explore more ways to plan your trip
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Find cruises based on your preferred destination, departure
                port, cruise line, date, ship, duration, and price.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                    <CheckCircle2 size={17} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f7f9]">
          <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:py-14">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <BadgePercent size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    About promotional offers
                  </h3>

                  <p className="mt-1.5 max-w-3xl text-xs leading-5 text-slate-500 sm:text-sm">
                    Promotional availability may vary by sailing, cruise line,
                    departure date, and cabin category. Offer terms and
                    availability may change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f7f9]">
          <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:pb-16">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-slate-950 p-7 sm:p-9 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Ready to sail?
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Find your next cruise.
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Search available sailings and compare cruises based on your
                  preferred destination, date, port, cruise line, and budget.
                </p>
              </div>

              <Link
                to="/search"
                className="inline-flex h-11 shrink-0 items-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Search cruises
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function OfferHighlight({
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

function PromotionCard({
  title,
  description,
  details,
  icon: Icon,
  image,
}: {
  title: string;
  description: string;
  details: string;
  icon: typeof Gift;
  image: string;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

        <div className="absolute left-5 top-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950 shadow-lg">
            <Icon size={18} />
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            {details}
          </p>

          <h3 className="mt-1.5 text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-sm leading-6 text-slate-500">{description}</p>

        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-500">
          <BadgePercent size={14} />
          Available on selected sailings
        </div>
      </div>
    </article>
  );
}
