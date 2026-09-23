import { CalendarDays, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DateSelectProps {
  value?: Date;
  availableDates: string[];
  onChange: (date: Date | undefined) => void;
}

export function DateSelect({
  value,
  availableDates,
  onChange,
}: DateSelectProps) {
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

  const availableDateSet = new Set(availableDates);

  function isDateAvailable(date: Date) {
    const formatted = formatDateForSearch(date);

    return availableDateSet.has(formatted);
  }

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
          <CalendarDays size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Departure date
          </p>

          <p
            className={`mt-1 truncate text-sm font-semibold ${
              value ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {value ? formatDisplayDate(value) : "Select a date"}
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
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (!date) {
                onChange(undefined);
                return;
              }

              if (!isDateAvailable(date)) {
                return;
              }

              onChange(date);
              setOpen(false);
            }}
            disabled={[
              {
                before: new Date(),
              },
              (date) => !isDateAvailable(date),
            ]}
            modifiers={{
              available: (date) => isDateAvailable(date) && date >= new Date(),
            }}
            modifiersClassNames={{
              available:
                "font-bold text-slate-900 bg-slate-100 hover:bg-slate-200",
            }}
            captionLayout="dropdown"
            startMonth={new Date()}
            endMonth={new Date(new Date().getFullYear() + 2, 11)}
          />

          {availableDates.length === 0 && (
            <div className="border-t border-slate-100 pt-3">
              <p className="text-center text-xs text-slate-500">
                No departures match your current selections.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDateForSearch(date: Date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
