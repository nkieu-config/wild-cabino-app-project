import type { Tables } from "../db/database.types";

export type Cabin = Tables<"cabins">;
export type Booking = Tables<"bookings">;
export type Guest = Tables<"guests">;
export type Settings = Tables<"settings">;

export type CabinSelect = Pick<
  Tables<"cabins">,
  "id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type BookingWithCabin = Pick<
  Tables<"bookings">,
  | "id"
  | "created_at"
  | "startDate"
  | "endDate"
  | "numNights"
  | "numGuests"
  | "totalPrice"
  | "guestId"
  | "cabinId"
  | "status"
> & {
  cabins: Pick<Tables<"cabins">, "name" | "image"> | null;
};

export type NewBookingData = Pick<
  Tables<"bookings">,
  "cabinId" | "startDate" | "endDate" | "numNights" | "cabinPrice"
>;

export type NewBooking = Omit<Booking, "id" | "created_at">;
export type NewGuest = Omit<Guest, "id" | "created_at">;

export interface Country {
  name: string;
  flag: string;
}
