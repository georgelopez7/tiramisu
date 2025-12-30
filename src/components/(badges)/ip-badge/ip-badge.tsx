import { IGeoLocation } from "@/domain/geolocation";
import Image from "next/image";
import React from "react";

interface IIPBadgeProps {
  geolocation: IGeoLocation;
}

const IPBadge = ({ geolocation }: IIPBadgeProps) => {
  return (
    <div className="flex items-center gap-1">
      <p className="text-xs">
        <span className="font-medium">IP Address - </span> {geolocation.ip}
      </p>
      {geolocation?.city && (
        <div className="flex items-center text-xs">
          <p className="mr-1">|</p>
          <Image
            className="mr-1"
            src={`https://flagsapi.com/${geolocation?.country}/flat/64.png`}
            alt={geolocation?.country}
            width={20}
            height={20}
          />
          <p>{geolocation?.city}</p>
          <p>, {geolocation?.country}</p>
        </div>
      )}
    </div>
  );
};

export default IPBadge;
