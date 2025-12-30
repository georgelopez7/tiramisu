import PageLayout from "@/components/page-layout/page-layout";
import RequestHeadersBlock from "@/components/(blocks)/request-headers-block/request-headers-block";
import RequestPayloadBlock from "@/components/(blocks)/request-payload-block/request-payload-block";
import Spacer from "@/components/spacer/spacer";
import WebhookSignatureBlock from "@/components/(blocks)/webhook-signature-block/webhook-signature-block";
import { GetGeoLocation } from "@/service/ip.service";
import {
  GetRequestByID,
  GetRequestSignature,
  GetRequestTimestamp,
} from "@/service/request.service";
import IPBadge from "@/components/(badges)/ip-badge/ip-badge";
import RequestMethodBadge from "@/components/(badges)/request-method-badge/request-method-badge";

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
  const timestampHeader = process.env.TIMESTAMP_HEADER ?? "";
  const signatureHeader = process.env.SIGNATURE_HEADER ?? "";

  const { timestamp } = await GetRequestTimestamp(
    request.headers ?? [],
    timestampHeader
  );

  const { signature } = await GetRequestSignature(
    request.headers ?? [],
    signatureHeader
  );

  return (
    <PageLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs">Request ID: {params.id}</p>
          {geoLocation.data && <IPBadge geolocation={geoLocation.data} />}
        </div>
        <Spacer size="small" />
        <div className="flex items-center rounded-md px-4 py-2 border gap-2">
          <RequestMethodBadge method={request.method} />
          <p>{request.path}</p>
        </div>
        <Spacer size="small" />
        <RequestHeadersBlock headers={request.headers ?? []} />
        <Spacer size="small" />
        <RequestPayloadBlock payload={request.payload} />
        <Spacer size="small" />
        <WebhookSignatureBlock
          signature={signature}
          signatureHeader={signatureHeader}
          timestamp={timestamp}
          timestampHeader={timestampHeader}
          payload={request.payload}
          secret={secret}
        />
      </div>
    </PageLayout>
  );
};

export default Page;
