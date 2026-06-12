"use client";

import { useOptimistic, useTransition } from "react";
import { deleteBooking } from "@/app/_lib/actions";
import { BookingWithCabin } from "@/app/_lib/types/types";
import ReservationCard from "./ReservationCard";

interface ReservationListProps {
  bookings: BookingWithCabin[];
}

function ReservationList({ bookings }: ReservationListProps) {
  const [, startTransition] = useTransition();
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  function handleDelete(bookingId: number) {
    startTransition(async () => {
      optimisticDelete(bookingId);
      const res = await deleteBooking(bookingId);
      if (!res.success && res.message) {
        alert(res.message);
      }
    });
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

