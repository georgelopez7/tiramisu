import PageLayout from "@/components/page-layout/page-layout";
import RequestsSection from "@/components/(sections)/requests-section/requests-section";
import Spacer from "@/components/spacer/spacer";
import BasePathBanner from "@/components/base-path-banner/base-path-banner";

const Page = () => {
  return (
    <PageLayout>
      <div className="w-[80%] mx-auto">
        <BasePathBanner />
        <Spacer size="medium" />
        <RequestsSection />
      </div>
    </PageLayout>
  );
};

export default Page;
