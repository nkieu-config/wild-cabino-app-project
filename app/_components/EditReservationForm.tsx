"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { updateBooking } from "@/app/_lib/actions";

interface EditReservationFormProps {
  bookingId: number;
  maxCapacity: number;
  numGuests: number;
  observations: string;
}

const initialState = { message: "", success: false };

function EditReservationForm({
  bookingId,
  maxCapacity,
  numGuests,
  observations,
}: EditReservationFormProps) {
  const [state, formAction] = useActionState(updateBooking, initialState);

  return (
    <form
      action={formAction}
      className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
    >
      {state?.message ? (
        <div className="bg-red-100 text-red-800 rounded-md p-4 text-sm">
          {state.message}
        </div>
      ) : null}

      <input type="hidden" name="bookingId" value={bookingId} />

      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={numGuests}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton pendingLabel="Updating...">
          Update Reservation
        </SubmitButton>
      </div>
    </form>
  );
}

export default EditReservationForm;
