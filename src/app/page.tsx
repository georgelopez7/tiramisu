import PageLayout from "@/components/page-layout/page-layout";
import RequestsSection from "@/components/(sections)/requests-section/requests-section";
import Spacer from "@/components/spacer/spacer";
import CopyToClipboard from "@/components/(buttons)/copy-to-clipboard/copy-to-clipboard";

const Page = () => {
  const baseURL = "http://localhost:3000";
  return (
    <PageLayout>
      <div className="w-[80%] mx-auto">
        <div className="flex items-center justify-between gap-4 border rounded-lg p-2 px-3 text-sm">
          <p className="font-semibold">
            Base Path:
            <span className="ml-2 font-normal">{baseURL}</span>
          </p>
          <CopyToClipboard text="{" />
        </div>
        <Spacer size="medium" />
        <RequestsSection />
      </div>
    </PageLayout>
  );
};

export default Page;
