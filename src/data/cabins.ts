import type { Cabin } from "../types/cabin";
import type { CabinType } from "../types/cruise";

interface CabinTemplate {
  type: CabinType;
  priceMultiplier: number;
  sleeps: number;
}

const cabinTemplates: CabinTemplate[] = [
  {
    type: "interior",
    priceMultiplier: 1,
    sleeps: 2,
  },
  {
    type: "oceanview",
    priceMultiplier: 1.25,
    sleeps: 2,
  },
  {
    type: "balcony",
    priceMultiplier: 1.55,
    sleeps: 3,
  },
  {
    type: "suite",
    priceMultiplier: 2.4,
    sleeps: 4,
  },
];

const cruiseBasePrices: Record<string, number> = {
  "caribbean-escape": 899,
  "caribbean-horizon": 1049,
  "bahamas-getaway": 599,
  "bahamas-sunrise": 649,
  "caribbean-discovery": 929,
  "mexico-coastal-escape": 699,
  "mexico-pacific": 829,
  "alaska-adventure": 1199,
  "alaska-solstice": 1349,
  "bermuda-escape": 749,
  "mediterranean-discovery": 1099,
  "hawaii-island-hopper": 1299,
};

const deckNumbers = [5, 6, 7, 8];

const cabinsPerDeck = 16;

function createCabinsForCruise(cruiseId: string, basePrice: number): Cabin[] {
  const generatedCabins: Cabin[] = [];

  deckNumbers.forEach((deck, deckIndex) => {
    for (let index = 0; index < cabinsPerDeck; index += 1) {
      const cabinNumber = String(deck * 100 + index + 1);

      const templateIndex = getCabinTemplateIndex(deckIndex, index);

      const template = cabinTemplates[templateIndex];

      const unavailable = getUnavailableStatus(deckIndex, index);

      generatedCabins.push({
        id: `${cruiseId}-${cabinNumber}`,
        cruiseId,
        number: cabinNumber,
        deck,
        type: template.type,
        status: unavailable ? "unavailable" : "available",
        price: Math.round(basePrice * template.priceMultiplier),
        sleeps: template.sleeps,
      });
    }
  });

  return generatedCabins;
}

function getCabinTemplateIndex(deckIndex: number, cabinIndex: number): number {
  if (deckIndex >= 2) {
    if (cabinIndex >= 12) {
      return 3;
    }

    if (cabinIndex >= 6) {
      return 2;
    }

    if (cabinIndex >= 4) {
      return 1;
    }

    return 0;
  }

  if (cabinIndex >= 14) {
    return 3;
  }

  if (cabinIndex >= 10) {
    return 2;
  }

  if (cabinIndex >= 6) {
    return 1;
  }

  return 0;
}

function getUnavailableStatus(deckIndex: number, cabinIndex: number): boolean {
  const unavailablePatterns = [
    [2, 7, 13],
    [4, 9, 15],
    [1, 6, 12],
    [3, 8, 14],
  ];

  return unavailablePatterns[deckIndex].includes(cabinIndex);
}

export const cabins: Cabin[] = Object.entries(cruiseBasePrices).flatMap(
  ([cruiseId, basePrice]) => createCabinsForCruise(cruiseId, basePrice),
);
