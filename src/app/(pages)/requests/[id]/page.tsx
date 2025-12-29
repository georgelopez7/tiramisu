import PageLayout from "@/components/page-layout/page-layout";
import RequestHeadersBlock from "@/components/request-headers-block/request-headers-block";
import RequestMethodLabel from "@/components/request-method-label/request-method-label";
import RequestPayloadBlock from "@/components/request-payload-block/request-payload-block";
import Spacer from "@/components/spacer/spacer";
import { GetRequestByID } from "@/repository/repository";

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

  return (
    <PageLayout>
      <div className="w-full">
        <p className="text-xs">Request ID: {params.id}</p>
        <Spacer size="small" />
        <div className="flex items-center rounded-md px-4 py-2 border gap-2">
          <RequestMethodLabel method={request.method} />
          <p>{request.path}</p>
        </div>
        <Spacer size="medium" />
        <RequestHeadersBlock headers={request.headers ?? []} />
        <Spacer size="small" />
        <RequestPayloadBlock payload={request.payload} />
        <Spacer size="small" />
        {/* <WebhookModal text="Validate" /> */}
      </div>
    </PageLayout>
  );
};

export default Page;
