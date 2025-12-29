import PageLayout from "@/components/page-layout/page-layout";
import RequestsSection from "@/components/(sections)/requests-section/requests-section";
import Spacer from "@/components/spacer/spacer";

const Page = () => {
  return (
    <PageLayout>
      <div className="w-[80%] mx-auto">
        <div className="flex items-center gap-4 text-center border rounded-lg p-2 px-4">
          <p className="font-bold">Base Path:</p>
          <p>http://localhost:3000</p>
        </div>
        <Spacer size="large" />
        <RequestsSection />
      </div>
    </PageLayout>
  );
};

export default Page;
