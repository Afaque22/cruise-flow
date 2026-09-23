import { ArrowDownAZ, ChevronDown } from "lucide-react";

export type SortOption =
  | "recommended"
  | "price-low"
  | "price-high"
  | "duration-short"
  | "duration-long"
  | "rating";

interface CruiseSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: {
  value: SortOption;
  label: string;
}[] = [
  {
    value: "recommended",
    label: "Recommended",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "duration-short",
    label: "Shortest Duration",
  },
  {
    value: "duration-long",
    label: "Longest Duration",
  },
  {
    value: "rating",
    label: "Highest Rated",
  },
];

export function CruiseSort({ value, onChange }: CruiseSortProps) {
  return (
    <div className="relative flex items-center gap-2">
      <ArrowDownAZ size={16} className="text-slate-400" />

      <span className="hidden text-xs font-medium text-slate-400 sm:block">
        Sort by
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as SortOption)}
          className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
