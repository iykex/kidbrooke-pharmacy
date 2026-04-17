import { GEO_LOCATION_PROVIDER } from "../constants/general";
import { GeolocationData } from "../types/analytics";

export async function getGeolocation(): Promise<GeolocationData | null> {
  try {
    const res = await fetch(GEO_LOCATION_PROVIDER);
    if (!res.ok) return null;
    const data = await res.json();

    return {
      country: data.country_name,
      country_code: data.country,
      city: data.city,
      region: data.region,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch {
    return null;
  }
}
