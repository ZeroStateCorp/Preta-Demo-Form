import { State } from "country-state-city";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const countryIso = request.nextUrl.searchParams.get("country") ?? "";
  const states = State.getStatesOfCountry(countryIso).map((s) => ({
    name: s.name,
    isoCode: s.isoCode,
  }));
  return Response.json(states);
}
