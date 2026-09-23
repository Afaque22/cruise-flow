import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DateOfBirthPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function parseDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getMinimumDate(): Date {
  const today = new Date();

  return new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate(),
  );
}

export function DateOfBirthPicker({
  label = "Date of birth",
  value,
  onChange,
  error,
}: DateOfBirthPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = parseDate(value);
  const today = new Date();
  const minimumDate = getMinimumDate();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  function handleSelect(date: Date | undefined) {
    if (!date) {
      return;
    }

    onChange(formatDateForInput(date));
    setOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-slate-950/10 ${
          error
            ? "border-red-400"
            : open
              ? "border-slate-400"
              : "border-slate-200 hover:border-slate-300"
        }`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span
          className={
            selectedDate
              ? "text-slate-900"
              : "text-slate-400"
          }
        >
          {selectedDate
            ? formatDisplayDate(selectedDate)
            : "Select date of birth"}
        </span>

        <span className="flex items-center gap-2 text-slate-400">
          <CalendarDays size={18} />
          <ChevronDown
            size={16}
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={{
              before: minimumDate,
              after: today,
            }}
            defaultMonth={
              selectedDate ?? new Date(
                today.getFullYear() - 25,
                today.getMonth(),
              )
            }
            captionLayout="dropdown"
            startMonth={minimumDate}
            endMonth={today}
          />
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}