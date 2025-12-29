"use client";

import RequestBanner from "@/components/request-banner/request-banner";
import Spacer from "@/components/spacer/spacer";
import { IRequest } from "@/domain/request";
import { GetRequests } from "@/service/request.service";
import { useEffect, useState } from "react";

const RequestsSection = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  useEffect(() => {
    const getRequests = async () => {
      const result = await GetRequests();
      setRequests(result);
    };
    getRequests();
  }, []);

  return (
    <div>
      <p>Requests</p>
      <Spacer size="small" />
      <div className="space-y-2">
        {requests.map((request) => (
          <div key={request.id}>
            <RequestBanner request={request} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsSection;
