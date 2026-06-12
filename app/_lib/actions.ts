"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./db/supabase";
import { getBookings } from "./db/data-service";
import { redirect } from "next/navigation";
import { NewBooking, NewBookingData } from "./types/types";
import { z } from "zod";

const GuestSchema = z.object({
  nationalID: z
    .string()
    .regex(/^[a-zA-Z0-9]{6,12}$/, "Please provide a valid national ID (6-12 characters)"),
});

export async function updateGuest(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { message: "You must be logged in" };

  const nationalityRaw = formData.get("nationality") as string;
  const nationalIDRaw = formData.get("nationalID") as string;

  if (!nationalityRaw) return { message: "Please select a nationality" };

  const [nationality, countryFlag] = nationalityRaw.split("%");

  const validatedFields = GuestSchema.safeParse({
    nationalID: nationalIDRaw,
  });

  if (!validatedFields.success) {
    return { message: validatedFields.error.issues[0].message };
  }

  const updateData = {
    nationality,
    countryFlag,
    nationalID: validatedFields.data.nationalID,
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) return { message: "Guest could not be updated" };

  revalidatePath("/account/profile");
  return { message: "Profile updated successfully!", success: true };
}

const BookingSchema = z.object({
  numGuests: z.coerce.number().min(1, "Please select at least 1 guest"),
  observations: z.string().max(1000, "Observations too long").optional(),
});

export async function createBooking(
  bookingData: NewBookingData,
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();
  if (!session) return { message: "You must be logged in" };

  const validatedFields = BookingSchema.safeParse({
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations")?.toString(),
  });

  if (!validatedFields.success) {
    return { message: validatedFields.error.issues[0].message };
  }

  const newBooking: NewBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: validatedFields.data.numGuests,
    observations: validatedFields.data.observations || null,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) return { message: "Booking could not be created" };

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) return { success: false, message: "You must be logged in" };

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    return { success: false, message: "You can only delete your own reservations" };

  const { error } = await supabase.from("bookings").delete().eq("id", bookingId);

  if (error) return { success: false, message: "Booking could not be deleted" };

  revalidatePath("/account/reservations");
  return { success: true };
}

const UpdateBookingSchema = z.object({
  bookingId: z.coerce.number(),
  numGuests: z.coerce.number().min(1, "Please select at least 1 guest"),
  observations: z.string().max(1000, "Observations too long").optional(),
});

export async function updateBooking(prevState: unknown, formData: FormData) {
  const validatedFields = UpdateBookingSchema.safeParse({
    bookingId: formData.get("bookingId"),
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations")?.toString(),
  });

  if (!validatedFields.success) {
    return { message: validatedFields.error.issues[0].message };
  }

  const { bookingId, numGuests, observations } = validatedFields.data;

  // 1) Authentication
  const session = await auth();
  if (!session) return { message: "You must be logged in" };

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    return { message: "You can only update your own bookings" };

  // 3) Update data
  const updateData = { numGuests, observations: observations || "" };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  // 5) Error handling
  if (error) return { message: "Booking could not be updated" };

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirect
  redirect("/account/reservations");
}

export async function signInAction() {
  return signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return signOut({ redirectTo: "/" });
}

