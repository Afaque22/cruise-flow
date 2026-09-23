import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchableSelectProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  disable?: boolean;
  onChange: (value: string) => void;
}

export function SearchableSelect({
  icon,
  label,
  placeholder,
  value,
  options,
  onChange,
  disable,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disable}
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-16 w-full items-center gap-3 rounded-[20px] px-4 py-2 text-left transition ${
          disable
            ? "cursor-not-allowed bg-slate-50 opacity-60"
            : open
              ? "bg-slate-50"
              : "hover:bg-slate-50"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            open ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <p
            className={`mt-1 truncate text-sm font-semibold ${
              value ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {value || placeholder}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/15">
          <div className="relative p-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:bg-slate-100"
            />
          </div>

          <div className="mt-1 max-h-64 overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setSearch("");
                setOpen(false);
              }}
              className="flex w-full rounded-xl px-3 py-3 text-left text-sm text-slate-500 hover:bg-slate-50"
            >
              {placeholder}
            </button>

            {filteredOptions.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setSearch("");
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                    selected
                      ? "bg-slate-100 font-semibold text-slate-950"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{option}</span>

                  {selected && <Check size={16} />}
                </button>
              );
            })}

            {filteredOptions.length === 0 && (
              <div className="px-3 py-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No results found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try a different search
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
