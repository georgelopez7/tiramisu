import { IRequest } from "@/domain/request";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RequestMethodBadge from "@/components/(badges)/request-method-badge/request-method-badge";

interface IRequestBannerProps {
  request: IRequest;
}

const RequestBanner = ({ request }: IRequestBannerProps) => {
  return (
    <Link
      href={`/requests/${request.id}`}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent hover:text-accent-foreground"
    >
      <RequestMethodBadge method={request.method} />
      <p>{request.path}</p>
      <ArrowUpRight className="size-4 ml-auto" />
    </Link>
  );
};

export default RequestBanner;
