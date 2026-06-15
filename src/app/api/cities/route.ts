import { City } from "country-state-city";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const countryIso = request.nextUrl.searchParams.get("country") ?? "";
  const stateIso = request.nextUrl.searchParams.get("state") ?? "";
  if (!stateIso) return Response.json([]);
  const cities = City.getCitiesOfState(countryIso, stateIso).map((c) => c.name);
  return Response.json(cities);
}
