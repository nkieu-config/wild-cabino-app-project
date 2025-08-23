"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "@/app/_lib/actions";
import { BookingWithCabin } from "@/app/_lib/types";
import ReservationCard from "./ReservationCard";

interface ReservationListProps {
  bookings: BookingWithCabin[];
}

function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
