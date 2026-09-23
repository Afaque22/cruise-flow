import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  MapPin,
  Ship,
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
import { cabins } from "../data/cabins";

import type { Cabin } from "../types/cabin";
import type { CabinType, Cruise } from "../types/cruise";

type DeckShape = "wide" | "medium" | "narrow";

interface ShipLayoutConfig {
  shape: "large" | "modern" | "compact" | "expedition";
  deckWidths: Record<number, DeckShape>;
}

interface CabinRow {
  left: Cabin[];
  right: Cabin[];
  width: DeckShape;
}

const shipLayouts: Record<string, ShipLayoutConfig> = {
  "Wonder of the Seas": {
    shape: "large",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "wide",
    },
  },

  "Celebrity Beyond": {
    shape: "modern",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "Carnival Celebration": {
    shape: "large",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "Freedom of the Seas": {
    shape: "large",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "Sky Princess": {
    shape: "modern",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "Carnival Breeze": {
    shape: "large",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "Norwegian Bliss": {
    shape: "modern",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "wide",
    },
  },

  "Norwegian Encore": {
    shape: "modern",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "wide",
    },
  },

  "Celebrity Solstice": {
    shape: "modern",
    deckWidths: {
      5: "narrow",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "Liberty of the Seas": {
    shape: "large",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "medium",
    },
  },

  "MSC Seaview": {
    shape: "modern",
    deckWidths: {
      5: "medium",
      6: "wide",
      7: "wide",
      8: "wide",
    },
  },

  "Pride of America": {
    shape: "compact",
    deckWidths: {
      5: "narrow",
      6: "medium",
      7: "medium",
      8: "narrow",
    },
  },
};

const defaultShipLayout: ShipLayoutConfig = {
  shape: "modern",
  deckWidths: {
    5: "medium",
    6: "wide",
    7: "wide",
    8: "medium",
  },
};

const shipShapeClasses: Record<ShipLayoutConfig["shape"], string> = {
  large: "rounded-[42%_42%_12%_12%]",
  modern: "rounded-[34%_34%_10%_10%]",
  compact: "rounded-[28%_28%_12%_12%]",
  expedition: "rounded-[18%_18%_8%_8%]",
};

const deckWidthClasses: Record<DeckShape, string> = {
  wide: "max-w-[570px]",
  medium: "max-w-[500px]",
  narrow: "max-w-[420px]",
};

function getCabinLabel(type: CabinType): string {
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

function buildCabinRows(deckCabins: Cabin[], width: DeckShape): CabinRow[] {
  const sortedCabins = [...deckCabins].sort(
    (a, b) => Number(a.number) - Number(b.number),
  );

  const rows: CabinRow[] = [];

  for (let index = 0; index < sortedCabins.length; index += 4) {
    const group = sortedCabins.slice(index, index + 4);

    rows.push({
      left: group.slice(0, 2),
      right: group.slice(2, 4),
      width,
    });
  }

  return rows;
}

function getAvailableCabinTypes(cabinsForDeck: Cabin[]): CabinType[] {
  return ["interior", "oceanview", "balcony", "suite"].filter((type) =>
    cabinsForDeck.some(
      (cabin) => cabin.type === type && cabin.status === "available",
    ),
  ) as CabinType[];
}

interface CabinButtonProps {
  cabin: Cabin;
  selected: boolean;
  onClick: () => void;
}

function CabinButton({ cabin, selected, onClick }: CabinButtonProps) {
  const unavailable = cabin.status === "unavailable";

  const typeClass =
    cabin.type === "suite"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : cabin.type === "balcony"
        ? "border-sky-200 bg-sky-50 text-sky-700"
        : cabin.type === "oceanview"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-600";

  return (
    <button
      type="button"
      disabled={unavailable}
      onClick={onClick}
      title={
        unavailable
          ? `Cabin ${cabin.number} is unavailable`
          : `${getCabinLabel(cabin.type)} cabin ${cabin.number}`
      }
      aria-pressed={selected}
      className={`group relative flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border text-[10px] font-bold transition ${
        unavailable
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300"
          : selected
            ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-300"
            : `${typeClass} hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md`
      }`}
    >
      {selected && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check size={10} strokeWidth={3} />
        </span>
      )}

      <span>{cabin.number}</span>
    </button>
  );
}

function CabinLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-slate-500">
      <LegendItem className="border-slate-200 bg-white" label="Interior" />

      <LegendItem
        className="border-emerald-200 bg-emerald-50"
        label="Ocean View"
      />

      <LegendItem className="border-sky-200 bg-sky-50" label="Balcony" />

      <LegendItem className="border-violet-200 bg-violet-50" label="Suite" />

      <LegendItem
        className="border-slate-200 bg-slate-100"
        label="Unavailable"
      />

      <LegendItem className="border-slate-950 bg-slate-950" label="Selected" />
    </div>
  );
}

function LegendItem({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-5 rounded border ${className}`} />

      <span>{label}</span>
    </div>
  );
}

function CabinSummary({
  cruise,
  selectedCabins,
  selectedDate,
  onContinue,
}: {
  cruise: Cruise;
  selectedCabins: Cabin[];
  selectedDate: string;
  onContinue: () => void;
}) {
  const total = selectedCabins.reduce((sum, cabin) => sum + cabin.price, 0);

  const cabinCount = selectedCabins.length;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Your selection
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-950">
            Booking summary
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Ship size={19} className="text-slate-700" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-400">Cruise</p>

          <p className="mt-1 font-semibold text-slate-900">{cruise.name}</p>

          <p className="mt-0.5 text-sm text-slate-500">{cruise.ship.name}</p>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400">Sailing</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(selectedDate)}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Duration</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {cruise.duration} nights
            </p>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {selectedCabins.length > 0 ? (
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Selected cabins</p>

                <p className="mt-1 font-bold text-slate-950">
                  {cabinCount} {cabinCount === 1 ? "cabin" : "cabins"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">Cabin total</p>

                <p className="mt-1 font-bold text-slate-950">
                  ${total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {selectedCabins.map((cabin) => (
                <div
                  key={cabin.id}
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Cabin {cabin.number}
                    </p>

                    <p className="text-xs text-slate-400">
                      {getCabinLabel(cabin.type)} · Deck {cabin.deck}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-slate-800">
                    ${cabin.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Users size={14} />

              <span>
                Total capacity:{" "}
                {selectedCabins.reduce((sum, cabin) => sum + cabin.sleeps, 0)}{" "}
                guests
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-sm font-medium text-slate-600">
              Select one or more cabins
            </p>

            <p className="mt-1 text-xs text-slate-400">
              You can select multiple available cabins from the deck map.
            </p>
          </div>
        )}

        <div className="flex items-end justify-between pt-1">
          <div>
            <p className="text-xs text-slate-400">Total</p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
              ${total.toLocaleString()}
            </p>
          </div>

          <p className="text-xs text-slate-400">
            {cabinCount === 0
              ? "No cabins"
              : cabinCount === 1
                ? "1 cabin"
                : `${cabinCount} cabins`}
          </p>
        </div>

        <button
          type="button"
          disabled={selectedCabins.length === 0}
          onClick={onContinue}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Continue
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

function formatDate(value: string): string {
  if (!value) {
    return "Not selected";
  }

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

export function CabinSelection() {
  const { cruiseId } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get("date") ?? "";

  const cruise = cruiseId ? getCruiseById(cruiseId) : undefined;

  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);

  const [selectedCabinType, setSelectedCabinType] = useState<CabinType | "all">(
    "all",
  );

  const [selectedCabinIds, setSelectedCabinIds] = useState<string[]>([]);

  if (!cruise) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-5 py-16">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Ship size={24} className="text-slate-500" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-950">
              Cruise not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The cruise you're trying to book could not be found.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white"
            >
              <ArrowLeft size={16} />
              Back to cruises
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const cruiseCabins = cabins.filter((cabin) => cabin.cruiseId === cruise.id);

  const decks = [...new Set(cruiseCabins.map((cabin) => cabin.deck))].sort(
    (a, b) => a - b,
  );

  const activeDeck = selectedDeck ?? decks[0] ?? null;

  const deckCabins = cruiseCabins.filter((cabin) => cabin.deck === activeDeck);

  const availableCabinTypes = getAvailableCabinTypes(deckCabins);

  const filteredCabins =
    selectedCabinType === "all"
      ? deckCabins
      : deckCabins.filter((cabin) => cabin.type === selectedCabinType);

  const layout = shipLayouts[cruise.ship.name] ?? defaultShipLayout;

  const deckShape = layout.deckWidths[activeDeck ?? 0] ?? "medium";

  const rows = buildCabinRows(filteredCabins, deckShape);

  const selectedCabins = cruiseCabins.filter((cabin) =>
    selectedCabinIds.includes(cabin.id),
  );

  const handleCabinSelect = (cabin: Cabin) => {
    if (cabin.status === "unavailable") {
      return;
    }

    setSelectedCabinIds((current) => {
      const alreadySelected = current.includes(cabin.id);

      if (alreadySelected) {
        return current.filter((id) => id !== cabin.id);
      }

      return [...current, cabin.id];
    });
  };

  const handleDeckChange = (deck: number) => {
    setSelectedDeck(deck);
    setSelectedCabinType("all");
  };

  const handleContinue = () => {
    if (selectedCabins.length === 0) {
      return;
    }

    /*
     * Store the complete selection so it is
     * available to the checkout flow without
     * putting multiple IDs into the URL.
     */
    sessionStorage.setItem(
      "cruiseflow-selected-cabins",
      JSON.stringify(selectedCabins.map((cabin) => cabin.id)),
    );

    sessionStorage.setItem(
      "cruiseflow-selected-cabin-total",
      String(selectedCabins.reduce((sum, cabin) => sum + cabin.price, 0)),
    );

    const firstCabin = selectedCabins[0];

    navigate(
      `/checkout?cruiseId=${encodeURIComponent(
        cruise.id,
      )}&date=${encodeURIComponent(selectedDate)}&cabinId=${encodeURIComponent(
        firstCabin.id,
      )}`,
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to={`/cruises/${cruise.id}${
              selectedDate ? `?date=${encodeURIComponent(selectedDate)}` : ""
            }`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to cruise
          </Link>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <span className="text-slate-950">01</span>

            <span>Cabin</span>

            <span className="mx-2 h-px w-6 bg-slate-200" />

            <span>02</span>

            <span>Guest details</span>

            <span className="mx-2 h-px w-6 bg-slate-200" />

            <span>03</span>

            <span>Payment</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Choose your cabin
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Select your cabin
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Ship size={15} />
                  {cruise.ship.name}
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {cruise.departurePort}
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <span>{formatDate(selectedDate)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400">From</p>

              <p className="mt-0.5 text-lg font-bold text-slate-950">
                ${cruise.priceFrom.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">per cabin</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    {cruise.ship.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Select one or more available cabins.
                  </p>
                </div>

                <div className="relative">
                  <select
                    value={activeDeck ?? ""}
                    onChange={(event) =>
                      handleDeckChange(Number(event.target.value))
                    }
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400"
                  >
                    {decks.map((deck) => (
                      <option key={deck} value={deck}>
                        Deck {deck}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {decks.map((deck) => {
                  const isActive = deck === activeDeck;

                  const cabinCount = cruiseCabins.filter(
                    (cabin) => cabin.deck === deck,
                  ).length;

                  return (
                    <button
                      key={deck}
                      type="button"
                      onClick={() => handleDeckChange(deck)}
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-slate-950 text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      Deck {deck}
                      <span
                        className={`ml-2 text-xs ${
                          isActive ? "text-slate-300" : "text-slate-400"
                        }`}
                      >
                        {cabinCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCabinType("all")}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    selectedCabinType === "all"
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  All cabins
                </button>

                {availableCabinTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedCabinType(type)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      selectedCabinType === type
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {getCabinLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[680px] px-5 py-8 sm:px-8 sm:py-10">
                <div
                  className={`relative mx-auto overflow-hidden border border-slate-300 bg-slate-50 px-8 py-10 shadow-inner transition-all duration-500 ${shipShapeClasses[layout.shape]} ${deckWidthClasses[deckShape]}`}
                >
                  <div className="relative z-10 mb-7 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 shadow-sm">
                      <ArrowRight size={12} />
                      Forward
                    </div>
                  </div>

                  <div className="mx-auto mb-6 h-px max-w-[180px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                  <div className="relative z-10 space-y-3">
                    {rows.length > 0 ? (
                      rows.map((row, rowIndex) => (
                        <div
                          key={`row-${rowIndex}`}
                          className={`mx-auto grid grid-cols-[1fr_58px_1fr] items-center gap-2 sm:grid-cols-[1fr_70px_1fr] sm:gap-3 ${deckWidthClasses[row.width]}`}
                        >
                          <div className="flex justify-end gap-1.5 sm:gap-2">
                            {row.left.map((cabin) => (
                              <CabinButton
                                key={cabin.id}
                                cabin={cabin}
                                selected={selectedCabinIds.includes(cabin.id)}
                                onClick={() => handleCabinSelect(cabin)}
                              />
                            ))}
                          </div>

                          <div className="relative h-10 rounded-lg border border-dashed border-slate-200 bg-white/80">
                            {rowIndex === Math.floor(rows.length / 2) && (
                              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-bold uppercase tracking-widest text-slate-300">
                                Corridor
                              </span>
                            )}
                          </div>

                          <div className="flex justify-start gap-1.5 sm:gap-2">
                            {row.right.map((cabin) => (
                              <CabinButton
                                key={cabin.id}
                                cabin={cabin}
                                selected={selectedCabinIds.includes(cabin.id)}
                                onClick={() => handleCabinSelect(cabin)}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-16 text-center">
                        <p className="text-sm font-semibold text-slate-600">
                          No cabins available for this filter.
                        </p>

                        <button
                          type="button"
                          onClick={() => setSelectedCabinType("all")}
                          className="mt-3 text-xs font-semibold text-slate-950 underline underline-offset-4"
                        >
                          Show all cabins
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mx-auto mt-7 h-px max-w-[180px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                  <div className="relative z-10 mt-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 shadow-sm">
                      Aft
                      <ArrowLeft size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
              <CabinLegend />
            </div>
          </section>

          <aside className="xl:sticky xl:top-[96px] xl:self-start">
            <CabinSummary
              cruise={cruise}
              selectedCabins={selectedCabins}
              selectedDate={selectedDate}
              onContinue={handleContinue}
            />

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Info size={17} className="text-slate-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Cabin selection
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Select one or more available cabins. Selected cabins are
                    included in the total shown above.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
