"use client";

import RequestBanner from "@/components/request-banner/request-banner";
import Spacer from "@/components/spacer/spacer";
import { Button } from "@/components/ui/button";
import { IRequest } from "@/domain/request";
import { cn } from "@/lib/utils";
import { GetRequests } from "@/service/request.service";
import { RefreshCw } from "lucide-react";
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

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await GetRequests();
    setRequests(result);
    setRefreshing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">Requests</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={cn(refreshing && "animate-spin")} />
        </Button>
      </div>
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
