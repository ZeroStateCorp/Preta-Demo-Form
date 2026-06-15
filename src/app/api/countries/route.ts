import { Country } from "country-state-city";

export async function GET() {
  const countries = Country.getAllCountries().map((c) => ({
    name: c.name,
    isoCode: c.isoCode,
  }));
  return Response.json(countries);
}
