import PageLayout from "@/components/page-layout/page-layout";
import RequestHeadersBlock from "@/components/request-headers-block/request-headers-block";
import RequestMethodLabel from "@/components/request-method-label/request-method-label";
import RequestPayloadBlock from "@/components/request-payload-block/request-payload-block";
import Spacer from "@/components/spacer/spacer";
import { GetRequestByID } from "@/repository/repository";
import { GetGeoLocation } from "@/service/ip.service";

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

  const geoLocation = await GetGeoLocation(request.ip);

  return (
    <PageLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs">Request ID: {params.id}</p>
          <p className="text-xs">
            IP: {request.ip} | {geoLocation.data?.country}
          </p>
        </div>
        <Spacer size="small" />
        <div className="flex items-center rounded-md px-4 py-2 border gap-2">
          <RequestMethodLabel method={request.method} />
          <p>{request.path}</p>
        </div>
        <Spacer size="medium" />
        <RequestHeadersBlock headers={request.headers ?? []} />
        <Spacer size="small" />
        <RequestPayloadBlock payload={request.payload} />
      </div>
    </PageLayout>
  );
};

export default Page;
