import { cruises } from "../data/cruises";
import type { Cruise } from "../types/cruise";
import type { CruiseSearchParams } from "../types/search";

export function getCruises(): Cruise[] {
  return cruises;
}

export function getCruiseById(
  id: string,
): Cruise | undefined {
  return cruises.find(
    (cruise) => cruise.id === id,
  );
}

export function searchCruises(
  params: CruiseSearchParams,
): Cruise[] {
  return cruises.filter((cruise) => {
    if (
      params.destination &&
      cruise.destination !== params.destination
    ) {
      return false;
    }

    if (
      params.departurePort &&
      cruise.departurePort !==
        params.departurePort
    ) {
      return false;
    }

    if (
      params.cruiseLine &&
      cruise.cruiseLine !==
        params.cruiseLine
    ) {
      return false;
    }

    if (
      params.ship &&
      cruise.ship.name !== params.ship
    ) {
      return false;
    }

    /*
     * A cruise can have multiple
     * departure dates.
     */
    if (
      params.date &&
      !cruise.departureDates.includes(
        params.date,
      )
    ) {
      return false;
    }

    if (
      params.duration &&
      !matchesDuration(
        cruise.duration,
        params.duration,
      )
    ) {
      return false;
    }

    if (
      params.minPrice !== undefined &&
      cruise.priceFrom <
        params.minPrice
    ) {
      return false;
    }

    if (
      params.maxPrice !== undefined &&
      cruise.priceFrom >
        params.maxPrice
    ) {
      return false;
    }

    return true;
  });
}

export function getAvailableDestinations(): string[] {
  return unique(
    cruises.map(
      (cruise) =>
        cruise.destination,
    ),
  );
}

export function getAvailablePorts(
  destination?: string,
): string[] {
  const filteredCruises =
    cruises.filter((cruise) => {
      if (
        destination &&
        cruise.destination !==
          destination
      ) {
        return false;
      }

      return true;
    });

  return unique(
    filteredCruises.map(
      (cruise) =>
        cruise.departurePort,
    ),
  );
}

export function getAvailableCruiseLines(
  destination?: string,
  departurePort?: string,
): string[] {
  const filteredCruises =
    cruises.filter((cruise) => {
      if (
        destination &&
        cruise.destination !==
          destination
      ) {
        return false;
      }

      if (
        departurePort &&
        cruise.departurePort !==
          departurePort
      ) {
        return false;
      }

      return true;
    });

  return unique(
    filteredCruises.map(
      (cruise) =>
        cruise.cruiseLine,
    ),
  );
}

export function getAvailableShips(
  destination?: string,
  departurePort?: string,
  cruiseLine?: string,
): string[] {
  const filteredCruises =
    cruises.filter((cruise) => {
      if (
        destination &&
        cruise.destination !==
          destination
      ) {
        return false;
      }

      if (
        departurePort &&
        cruise.departurePort !==
          departurePort
      ) {
        return false;
      }

      if (
        cruiseLine &&
        cruise.cruiseLine !==
          cruiseLine
      ) {
        return false;
      }

      return true;
    });

  return unique(
    filteredCruises.map(
      (cruise) =>
        cruise.ship.name,
    ),
  );
}

export function getAvailableDates(
  destination?: string,
  departurePort?: string,
  cruiseLine?: string,
  ship?: string,
): string[] {
  const filteredCruises =
    cruises.filter((cruise) => {
      if (
        destination &&
        cruise.destination !==
          destination
      ) {
        return false;
      }

      if (
        departurePort &&
        cruise.departurePort !==
          departurePort
      ) {
        return false;
      }

      if (
        cruiseLine &&
        cruise.cruiseLine !==
          cruiseLine
      ) {
        return false;
      }

      if (
        ship &&
        cruise.ship.name !== ship
      ) {
        return false;
      }

      return true;
    });

  return unique(
    filteredCruises.flatMap(
      (cruise) =>
        cruise.departureDates,
    ),
  ).sort();
}

function unique(
  values: string[],
): string[] {
  return [...new Set(values)];
}

function matchesDuration(
  duration: number,
  filter: string,
): boolean {
  switch (filter) {
    case "1-2":
      return duration >= 1 && duration <= 2;

    case "3-5":
      return duration >= 3 && duration <= 5;

    case "6-8":
      return duration >= 6 && duration <= 8;

    case "9-11":
      return duration >= 9 && duration <= 11;

    case "12+":
      return duration >= 12;

    default:
      return true;
  }
}