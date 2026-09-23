import type { CabinType } from "./cruise";

export type CabinStatus = "available" | "unavailable";

export interface Cabin {
  id: string;
  cruiseId: string;
  number: string;
  deck: number;
  type: CabinType;
  status: CabinStatus;
  price: number;
  sleeps: number;
}