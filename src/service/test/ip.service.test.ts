import { GetGeoLocation } from "../ip.service";

describe("TestService_GetGeoLocation", () => {
  test("should return localhost data", async () => {
    const { data, error } = await GetGeoLocation("::1");
    expect(data?.ip).toBe("::1");
    expect(data?.city).toBe("");
    expect(data?.region).toBe("");
    expect(data?.country).toBe("");
    expect(error).toBe(null);
  });

  test("should return valid data", async () => {
    const { data, error } = await GetGeoLocation("8.8.8.8");
    expect(data?.ip).toBe("8.8.8.8");
    expect(data?.city).toBe("Mountain View");
    expect(data?.region).toBe("California");
    expect(data?.country).toBe("US");
    expect(error).toBe(null);
  });

  test("should return null data", async () => {
    const { data, error } = await GetGeoLocation("invalid-ip");
    expect(data).toBe(null);
    expect(error).toBe("Invalid IP address");
  });
});
