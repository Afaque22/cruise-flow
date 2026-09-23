import { ChevronDown, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface GuestsSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export function GuestsSelect({ value, onChange }: GuestsSelectProps) {
  const [open, setOpen] = useState(false);

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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-16 w-full items-center gap-3 rounded-[20px] px-4 py-2 text-left transition ${
          open ? "bg-slate-50" : "hover:bg-slate-50"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            open ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          <Users size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Guests
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {value} {value === 1 ? "guest" : "guests"}
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
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Guests</p>

              <p className="mt-1 text-xs text-slate-400">
                How many people are traveling?
              </p>
            </div>

            <Users size={18} className="text-slate-400" />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              disabled={value <= 1}
              onClick={() => onChange(Math.max(1, value - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg hover:bg-slate-50 disabled:opacity-40"
            >
              −
            </button>

            <span className="text-lg font-bold">{value}</span>

            <button
              type="button"
              disabled={value >= 6}
              onClick={() => onChange(Math.min(6, value + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg hover:bg-slate-50 disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-5 w-full rounded-xl bg-slate-950 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
