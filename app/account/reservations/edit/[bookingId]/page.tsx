import EditReservationForm from "@/app/_components/EditReservationForm";
import { getBooking, getCabin } from "@/app/_lib/db/data-service";

interface PageParams {
  params: Promise<{ bookingId: string }>;
}

export default async function Page({ params }: PageParams) {
  const { bookingId } = await params;
  const { numGuests, observations, cabinId } = await getBooking(
    Number(bookingId),
  );
  const { maxCapacity } = await getCabin(cabinId!);

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{bookingId}
      </h2>

      <EditReservationForm
        bookingId={Number(bookingId)}
        maxCapacity={maxCapacity || 0}
        numGuests={numGuests || 1}
        observations={observations || ""}
      />
    </div>
  );
}
