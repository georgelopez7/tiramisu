import PageLayout from "@/components/page-layout/page-layout";
import RequestHeadersBlock from "@/components/(blocks)/request-headers-block/request-headers-block";
import RequestMethodLabel from "@/components/request-method-label/request-method-label";
import RequestPayloadBlock from "@/components/(blocks)/request-payload-block/request-payload-block";
import Spacer from "@/components/spacer/spacer";
import WebhookSignatureBlock from "@/components/(blocks)/webhook-signature-block/webhook-signature-block";
import { GetGeoLocation } from "@/service/ip.service";
import {
  GetRequestByID,
  GetRequestSignature,
  GetRequestTimestamp,
} from "@/service/request.service";

interface IPageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: IPageProps) => {
  const requestID = parseInt(params.id);
  const request = await GetRequestByID(requestID);

  if (!request) {
    return <p>Request not found</p>;
  }

  // GEOLOCATION
  const geoLocation = await GetGeoLocation(request.ip);

  // WEBHOOK SETTINGS
  const secret = process.env.WEBHOOK_SECRET ?? "";
  const { timestamp } = GetRequestTimestamp(
    request.headers ?? [],
    process.env.TIMESTAMP_HEADER ?? ""
  );

  const { signature } = GetRequestSignature(
    request.headers ?? [],
    process.env.SIGNATURE_HEADER ?? ""
  );

  return (
    <PageLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs">Request ID: {params.id}</p>
          <p className="text-xs">
            IP Address: {request.ip} | {geoLocation.data?.country}
          </p>
        </div>
        <Spacer size="small" />
        <div className="flex items-center rounded-md px-4 py-2 border gap-2">
          <RequestMethodLabel method={request.method} />
          <p>{request.path}</p>
        </div>
        <Spacer size="small" />
        <RequestHeadersBlock headers={request.headers ?? []} />
        <Spacer size="small" />
        <RequestPayloadBlock payload={request.payload} />
        <Spacer size="small" />
        <WebhookSignatureBlock
          signature={signature}
          timestamp={timestamp}
          payload={request.payload}
          secret={secret}
        />
      </div>
    </PageLayout>
  );
};

export default Page;
