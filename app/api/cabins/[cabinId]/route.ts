import { NextRequest } from "next/server";
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/db/data-service";

interface RouteParams {
  params: Promise<{ cabinId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
