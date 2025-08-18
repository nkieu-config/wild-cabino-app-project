export interface Cabin {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Guest {
  id: number;
  created_at: string;
  fullName: string | null;
  email: string | null;
  nationalID: string | null;
  nationality: string | null;
  countryFlag: string | null;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  cabinPrice: number | null;
  extrasPrice: number | null;
  totalPrice: number | null;
  status: string | null;
  hasBreakfast: boolean | null;
  isPaid: boolean | null;
  observations: string | null;
  cabinId: number | null;
  guestId: number | null;
}

export interface Settings {
  id: number;
  created_at: string;
  minBookingLength: number | null;
  maxBookingLength: number | null;
  maxGuestPerBooking: number | null;
  breakfastPrice: number | null;
}

export interface Country {
  name: string;
  flag: string;
}

export type CabinSelect = Pick<
  Cabin,
  "id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type BookingWithCabin = Pick<
  Booking,
  | "id"
  | "created_at"
  | "startDate"
  | "endDate"
  | "numNights"
  | "numGuests"
  | "totalPrice"
  | "guestId"
  | "cabinId"
> & {
  cabins: Pick<Cabin, "name" | "image">[];
};

export type NewGuest = Omit<Guest, "id" | "created_at">;
export type NewBooking = Omit<Booking, "id" | "created_at">;
export type GuestUpdate = Partial<Omit<Guest, "id" | "created_at">>;
export type BookingUpdate = Partial<Omit<Booking, "id" | "created_at">>;
