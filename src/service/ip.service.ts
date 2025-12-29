"use server";

import { IGeoLocation } from "@/domain/geolocation";

// GetGeoLocation - get the geo location of an IP address
export const GetGeoLocation = async (
  ip: string
): Promise<{
  data: IGeoLocation | null;
  error: string | null;
}> => {
  if (ip === "::1" || ip === "127.0.0.1") {
    return {
      data: {
        ip: ip,
        city: "",
        region: "",
        country: "localhost",
      },
      error: null,
    };
  }

  const response = await fetch(`https://ipapi.co/${ip}/json/`);

  if (!response.ok) {
    return {
      data: null,
      error: "Failed to fetch IP data",
    };
  }

  const data = await response.json();
  const geoLocationData = {
    ip: data.ip,
    city: data.city,
    region: data.region,
    country: data.country,
  };

  return {
    data: geoLocationData as IGeoLocation,
    error: null,
  };
};
