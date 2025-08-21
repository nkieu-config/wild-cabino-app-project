"use client";

import type { User } from "next-auth";
import { Cabin } from "@/app/_lib/types";
import { useReservation } from "./ReservationContext";
import Image from "next/image";

interface ReservationFormProps {
  cabin: Cabin;
  user: User;
}

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range } = useReservation();
  const { maxCapacity } = cabin;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-16 py-4">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <div className="relative h-8 w-8">
            <Image
              referrerPolicy="no-referrer"
              className="rounded-full object-cover"
              fill
              src={user.image ?? "/default-avatar.png"}
              alt={user.name ?? "Guest avatar"}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form className="bg-primary-900 flex flex-col gap-6 px-16 py-15 text-lg">
        <div className="flex flex-col gap-1 space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
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

        <div className="flex flex-col gap-1 space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
