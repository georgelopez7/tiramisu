import { IRequest } from "@/domain/request";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RequestMethodBadge from "@/components/(badges)/request-method-badge/request-method-badge";

interface IRequestBannerProps {
  request: IRequest;
}

const RequestBanner = ({ request }: IRequestBannerProps) => {
  const basePath = request.path.split("?")[0];
  const params = request.path.split("?")[1];
  return (
    <Link
      href={`/requests/${request.id}`}
      className="flex items-center justify-between gap-2 px-3 py-2 border rounded-lg hover:bg-accent hover:text-accent-foreground"
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <RequestMethodBadge method={request.method} />
        <p className="text-sm font-medium italic truncate">
          {basePath}
          <span className="text-muted-foreground">
            {params && "?"}
            {params}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="ml-4 text-xs italic text-muted-foreground">
          ({request.created_at})
        </p>
        <ArrowUpRight className="size-4" />
      </div>
    </Link>
  );
};

export default RequestBanner;
