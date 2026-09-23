import {
  ArrowRight,
  CalendarDays,
  Check,
  Download,
  Mail,
  MapPin,
  Phone,
  Ship,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Navbar } from "../components/layout/Navbar";
import { cabins } from "../data/cabins";
import { getCruiseById } from "../services/cruiseService";

import type { Cabin } from "../types/cabin";

interface BookingGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
}

function formatDate(value: string) {
  if (!value) {
    return "Not selected";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatBookingId(cruiseId: string, cabinIds: string[]) {
  const cruisePart = cruiseId
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 4)
    .toUpperCase();

  const cabinPart = cabinIds
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-6)
    .toUpperCase();

  return `CF-${cruisePart}-${cabinPart}`;
}

function getCabinTypeLabel(type: string) {
  switch (type) {
    case "interior":
      return "Interior";

    case "oceanview":
      return "Ocean View";

    case "balcony":
      return "Balcony";

    case "suite":
      return "Suite";

    default:
      return type;
  }
}

function getStoredGuest(): BookingGuest | null {
  const storedGuest = sessionStorage.getItem("cruiseflow-booking-guest");

  if (!storedGuest) {
    return null;
  }

  try {
    return JSON.parse(storedGuest) as BookingGuest;
  } catch {
    return null;
  }
}

function getStoredCabinIds(): string[] {
  const storedCabins = sessionStorage.getItem("cruiseflow-selected-cabins");

  if (!storedCabins) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(storedCabins);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function ConfirmationDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export function BookingConfirmation() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const cruiseId = searchParams.get("cruiseId") ?? "";

  const selectedDate = searchParams.get("date") ?? "";

  const storedCabinIds = getStoredCabinIds();
  const legacyCabinId = searchParams.get("cabinId");

  const cabinIds =
    storedCabinIds.length > 0
      ? storedCabinIds
      : legacyCabinId
        ? [legacyCabinId]
        : [];

  const cruise = getCruiseById(cruiseId);

  const selectedCabins = cabinIds
    .map((cabinId) =>
      cabins.find(
        (cabin) => cabin.id === cabinId && cabin.cruiseId === cruiseId,
      ),
    )
    .filter((cabin): cabin is Cabin => Boolean(cabin));

  const guest = getStoredGuest();

  const bookingIsValid =
    Boolean(cruise) &&
    cabinIds.length > 0 &&
    selectedCabins.length === cabinIds.length;

  if (!bookingIsValid || !cruise) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-5 py-16">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Ship size={24} className="text-slate-500" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-950">
              Booking not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We could not find the booking information associated with this
              confirmation.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Browse cruises
              <ArrowRight size={16} />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const cabinSubtotal = selectedCabins.reduce(
    (sum, cabin) => sum + cabin.price,
    0,
  );

  const taxes = Math.round(cabinSubtotal * 0.12);

  const total = cabinSubtotal + taxes;

  const bookingId = formatBookingId(
    cruise.id,
    selectedCabins.map((cabin) => cabin.id),
  );

  const guestName = guest ? `${guest.firstName} ${guest.lastName}`.trim() : "";

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      <main className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8 lg:py-14">
        <section className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check size={25} strokeWidth={3} />
            </div>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
            Booking confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Your cruise is booked.
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
            {guestName
              ? `Thank you, ${guestName}. Your reservation has been successfully created.`
              : "Your reservation has been successfully created."}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs text-slate-400">Booking reference</span>

            <span className="text-sm font-bold tracking-wide text-slate-900">
              {bookingId}
            </span>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden">
            <img
              src={cruise.image}
              alt={cruise.name}
              decoding="async"
              className="h-52 w-full object-cover sm:h-64"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Your voyage
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                {cruise.name}
              </h2>

              <p className="mt-1 text-sm text-white/80">{cruise.ship.name}</p>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
            <ConfirmationDetail
              icon={<CalendarDays size={17} />}
              label="Sailing date"
              value={formatDate(selectedDate)}
            />

            <ConfirmationDetail
              icon={<MapPin size={17} />}
              label="Departure"
              value={cruise.departurePort}
            />

            <ConfirmationDetail
              icon={<Ship size={17} />}
              label="Duration"
              value={`${cruise.duration} nights`}
            />

            <ConfirmationDetail
              icon={<Users size={17} />}
              label="Cabins"
              value={`${selectedCabins.length} ${
                selectedCabins.length === 1 ? "cabin" : "cabins"
              }`}
            />
          </div>

          <div className="border-t border-slate-100 p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Guest information
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ConfirmationDetail
                icon={<Users size={17} />}
                label="Guest name"
                value={guestName || "Not provided"}
              />

              <ConfirmationDetail
                icon={<Mail size={17} />}
                label="Email"
                value={guest?.email || "Not provided"}
              />

              <ConfirmationDetail
                icon={<Phone size={17} />}
                label="Phone"
                value={guest?.phone || "Not provided"}
              />

              <ConfirmationDetail
                icon={<MapPin size={17} />}
                label="Country"
                value={guest?.country || "Not provided"}
              />

              <ConfirmationDetail
                icon={<CalendarDays size={17} />}
                label="Date of birth"
                value={
                  guest?.dateOfBirth
                    ? formatDate(guest.dateOfBirth)
                    : "Not provided"
                }
              />
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_280px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Selected cabins
              </p>

              <div className="mt-4 space-y-3">
                {selectedCabins.map((cabin, index) => (
                  <div key={cabin.id} className="rounded-2xl bg-slate-50 p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-slate-500 shadow-sm">
                            {index + 1}
                          </span>

                          <p className="text-lg font-bold text-slate-950">
                            Cabin {cabin.number}
                          </p>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          {getCabinTypeLabel(cabin.type)} · Deck {cabin.deck}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Users size={16} />

                          <span>Sleeps up to {cabin.sleeps}</span>
                        </div>

                        <p className="text-base font-bold text-slate-950">
                          ${cabin.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Mail size={17} className="text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Confirmation details
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {guest?.email
                      ? `Your confirmation details are associated with ${guest.email}.`
                      : "In a production application, your confirmation would be sent to the email address provided during checkout."}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-fit rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Payment summary
              </p>

              <div className="mt-5 space-y-3 text-sm">
                {selectedCabins.map((cabin) => (
                  <div key={cabin.id} className="flex justify-between gap-4">
                    <span className="text-slate-500">Cabin {cabin.number}</span>

                    <span className="font-medium text-slate-800">
                      ${cabin.price.toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="h-px bg-slate-100" />

                <div className="flex justify-between gap-4">
                  <span className="font-medium text-slate-600">
                    Cabin subtotal
                  </span>

                  <span className="font-semibold text-slate-800">
                    ${cabinSubtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Taxes & fees</span>

                  <span className="font-medium text-slate-800">
                    ${taxes.toLocaleString()}
                  </span>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="flex items-end justify-between gap-4">
                  <span className="font-semibold text-slate-800">Total</span>

                  <span className="text-xl font-bold text-slate-950">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="print-hidden mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Download size={17} />
            Print confirmation
          </button>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to home
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="print-hidden mt-8 rounded-2xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-xs leading-5 text-slate-400">
            CruiseFlow demo · This confirmation represents a mock booking for
            the frontend assessment. No real reservation or payment has been
            created.
          </p>
        </div>
      </main>
    </div>
  );
}
