import { IRequest } from "@/domain/request";
import React from "react";
import RequestMethodLabel from "../request-method-label/request-method-label";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface IRequestBannerProps {
  request: IRequest;
}

const RequestBanner = ({ request }: IRequestBannerProps) => {
  return (
    <Link
      href={`/requests/${request.id}`}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent hover:text-accent-foreground"
    >
      <RequestMethodLabel method={request.method} />
      <p>{request.path}</p>
      <ArrowUpRight className="size-4 ml-auto" />
    </Link>
  );
};

export default RequestBanner;
