import { Check, ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";

interface CruiseFiltersProps {
  destinations: string[];
  ports: string[];
  cruiseLines: string[];
  durations: {
    value: string;
    label: string;
  }[];

  destination: string;
  departurePort: string;
  cruiseLine: string;
  duration: string;

  minPrice: string;
  maxPrice: string;

  onDestinationChange: (value: string) => void;

  onDeparturePortChange: (value: string) => void;

  onCruiseLineChange: (value: string) => void;

  onDurationChange: (value: string) => void;

  onMinPriceChange: (value: string) => void;

  onMaxPriceChange: (value: string) => void;

  onClear: () => void;
}

export function CruiseFilters({
  destinations,
  ports,
  cruiseLines,
  durations,
  destination,
  departurePort,
  cruiseLine,
  duration,
  minPrice,
  maxPrice,
  onDestinationChange,
  onDeparturePortChange,
  onCruiseLineChange,
  onDurationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: CruiseFiltersProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <SlidersHorizontal size={17} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-950">Filters</h2>

            <p className="text-[11px] text-slate-400">Refine your search</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-slate-950"
        >
          <RotateCcw size={13} />
          Clear
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <FilterSelect
          label="Destination"
          value={destination}
          options={destinations}
          placeholder="All destinations"
          onChange={onDestinationChange}
        />

        <FilterSelect
          label="Departure port"
          value={departurePort}
          options={ports}
          placeholder="All departure ports"
          onChange={onDeparturePortChange}
        />

        <FilterSelect
          label="Cruise line"
          value={cruiseLine}
          options={cruiseLines}
          placeholder="All cruise lines"
          onChange={onCruiseLineChange}
        />

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Duration
          </label>

          <div className="space-y-1">
            {durations.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                    duration === option.value
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {duration === option.value && (
                    <Check size={13} strokeWidth={3} />
                  )}
                </span>

                <input
                  type="radio"
                  name="duration"
                  value={option.value}
                  checked={duration === option.value}
                  onChange={() => onDurationChange(option.value)}
                  className="sr-only"
                />

                <span className="text-sm font-medium text-slate-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Price per person
          </label>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="sr-only">Minimum price</label>

              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => onMinPriceChange(event.target.value)}
                placeholder="Min"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>

            <div>
              <label className="sr-only">Maximum price</label>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => onMaxPriceChange(event.target.value)}
                placeholder="Max"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  options,
  placeholder,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-400"
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}
