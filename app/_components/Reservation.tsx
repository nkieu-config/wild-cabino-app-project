import { auth } from "@/app/_lib/auth";
import {
  getBookedDatesByCabinId,
  getSettings,
} from "@/app/_lib/db/data-service";
import { Cabin } from "@/app/_lib/types/types";
import dynamic from "next/dynamic";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";

const DateSelector = dynamic(() => import("./DateSelector"));

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="border-primary-800 grid min-h-[400px] grid-cols-[1fr_2fr] border">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
