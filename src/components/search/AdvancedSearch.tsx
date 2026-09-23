import { Clock3, Ship, SlidersHorizontal } from "lucide-react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { SearchForm } from "./CruiseSearch";
import { SearchableSelect } from "./SearchableSelect";

interface AdvancedSearchProps {
  control: Control<SearchForm>;
  cruiseLineOptions: string[];
  shipOptions: string[];
  cruiseLine: string;
  onClear: () => void;
}

const durationOptions = ["1-2", "3-5", "6-8", "9-11", "12+"];

export function AdvancedSearch({
  control,
  cruiseLineOptions,
  shipOptions,
  cruiseLine,
  onClear,
}: AdvancedSearchProps) {
  return (
    <div className="border-t border-slate-100 pt-4">
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <SlidersHorizontal size={16} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">Advanced filters</p>

            <p className="text-xs text-slate-400">
              Narrow down your cruise search
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-slate-400 transition hover:text-slate-900"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <Controller
          name="cruiseLine"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              icon={<Ship size={18} />}
              label="Cruise line"
              placeholder={
                cruiseLine ? "All cruise lines" : "Choose cruise line"
              }
              value={field.value}
              options={cruiseLineOptions}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="ship"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              icon={<Ship size={18} />}
              label="Ship"
              placeholder={
                cruiseLine ? "All ships" : "Choose cruise line first"
              }
              value={field.value}
              options={shipOptions}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              icon={<Clock3 size={18} />}
              label="Duration"
              placeholder="Any duration"
              value={formatDuration(field.value)}
              options={durationOptions.map(formatDuration)}
              onChange={(value) => {
                field.onChange(parseDuration(value));
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

function formatDuration(value: string): string {
  switch (value) {
    case "1-2":
      return "1–2 nights";

    case "3-5":
      return "3–5 nights";

    case "6-8":
      return "6–8 nights";

    case "9-11":
      return "9–11 nights";

    case "12+":
      return "12+ nights";

    default:
      return value;
  }
}

function parseDuration(value: string): string {
  switch (value) {
    case "1–2 nights":
      return "1-2";

    case "3–5 nights":
      return "3-5";

    case "6–8 nights":
      return "6-8";

    case "9–11 nights":
      return "9-11";

    case "12+ nights":
      return "12+";

    default:
      return "";
  }
}
