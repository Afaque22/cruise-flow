import { ChevronDown, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  getAvailableCruiseLines,
  getAvailableDates,
  getAvailableDestinations,
  getAvailablePorts,
  getAvailableShips,
} from "../../services/cruiseService";

import { AdvancedSearch } from "./AdvancedSearch";
import { DateSelect } from "./DateSelect";
import { GuestsSelect } from "./GuestsSelect";
import { SearchableSelect } from "./SearchableSelect";

export interface SearchForm {
  destination: string;
  departurePort: string;
  date: string;
  cruiseLine: string;
  ship: string;
  duration: string;
  guests: number;
}

export function CruiseSearch() {
  const navigate = useNavigate();

  const [advancedOpen, setAdvancedOpen] = useState(false);

  const { control, handleSubmit, setValue } = useForm<SearchForm>({
    defaultValues: {
      destination: "",
      departurePort: "",
      date: "",
      cruiseLine: "",
      ship: "",
      duration: "",
      guests: 1,
    },
  });

  const destination = useWatch({
    control,
    name: "destination",
  });

  const departurePort = useWatch({
    control,
    name: "departurePort",
  });

  const cruiseLine = useWatch({
    control,
    name: "cruiseLine",
  });

  const ship = useWatch({
    control,
    name: "ship",
  });

  const duration = useWatch({
    control,
    name: "duration",
  });

  const destinations = getAvailableDestinations();

  const ports = getAvailablePorts(destination);

  const cruiseLines = getAvailableCruiseLines(destination, departurePort);

  const ships = getAvailableShips(destination, departurePort, cruiseLine);

  const availableDates = getAvailableDates(
    destination,
    departurePort,
    cruiseLine,
    ship,
  );

  function handleDestinationChange(
    value: string,
    onChange: (value: string) => void,
  ) {
    onChange(value);

    setValue("departurePort", "");
    setValue("cruiseLine", "");
    setValue("ship", "");
    setValue("date", "");
  }

  function handlePortChange(value: string, onChange: (value: string) => void) {
    onChange(value);

    setValue("cruiseLine", "");
    setValue("ship", "");
    setValue("date", "");
  }

  function onSubmit(values: SearchForm) {
    const params = new URLSearchParams();

    if (values.destination) {
      params.set("destination", values.destination);
    }

    if (values.departurePort) {
      params.set("port", values.departurePort);
    }

    if (values.date) {
      params.set("date", values.date);
    }

    if (values.cruiseLine) {
      params.set("line", values.cruiseLine);
    }

    if (values.ship) {
      params.set("ship", values.ship);
    }

    if (values.duration) {
      params.set("duration", values.duration);
    }

    params.set("guests", String(values.guests));

    navigate(`/search?${params.toString()}`);
  }

  function clearAdvancedFilters() {
    setValue("cruiseLine", "");
    setValue("ship", "");
    setValue("duration", "");
    setValue("date", "");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-[30px] border border-white/80 bg-white p-2 shadow-[0_25px_80px_rgba(15,23,42,0.16)] sm:p-3"
    >
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-[1.35fr_1.35fr_1.25fr_1fr_auto]">
        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              icon={<MapPin size={18} />}
              label="Destination"
              placeholder="Any destination"
              value={field.value}
              options={destinations}
              onChange={(value) =>
                handleDestinationChange(value, field.onChange)
              }
            />
          )}
        />

        <Controller
          name="departurePort"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              icon={<MapPin size={18} />}
              label="Departure port"
              placeholder={
                destination ? "Any departure port" : "Select destination first"
              }
              value={field.value}
              options={ports}
              disable={!destination}
              onChange={(value) => handlePortChange(value, field.onChange)}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DateSelect
              value={field.value ? parseDate(field.value) : undefined}
              availableDates={availableDates}
              onChange={(date) => {
                field.onChange(date ? formatDateForSearch(date) : "");
              }}
            />
          )}
        />

        <Controller
          name="guests"
          control={control}
          render={({ field }) => (
            <GuestsSelect value={field.value} onChange={field.onChange} />
          )}
        />

        <button
          type="submit"
          className="group flex min-h-16 items-center justify-center gap-2 rounded-[20px] bg-slate-950 px-7 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] md:col-span-2 lg:col-span-1"
        >
          <Search
            size={18}
            className="transition-transform group-hover:scale-110"
          />

          <span>Search cruises</span>
        </button>
      </div>

      <div className="mt-1 border-t border-slate-100 pt-1">
        <button
          type="button"
          onClick={() => setAdvancedOpen((current) => !current)}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <span>
            {advancedOpen ? "Hide advanced filters" : "More search options"}
          </span>

          <ChevronDown
            size={15}
            className={`transition-transform ${
              advancedOpen ? "rotate-180" : ""
            }`}
          />

          {(cruiseLine || ship || duration) && (
            <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-white">
              Active
            </span>
          )}
        </button>
      </div>

      {advancedOpen && (
        <AdvancedSearch
          control={control}
          cruiseLineOptions={cruiseLines}
          shipOptions={ships}
          onClear={clearAdvancedFilters}
          cruiseLine={cruiseLine}
        />
      )}
    </form>
  );
}

function formatDateForSearch(date: Date): string {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}
