import PageLayout from "@/components/page-layout/page-layout";
import Spacer from "@/components/spacer/spacer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center">
        <p className="font-semibold text-xl text-center">
          Oops... your inspecting took a wrong turn.
        </p>
        <Spacer size="small" />
        <Link href="/" className={buttonVariants()}>
          <ArrowUpLeft />
          Return
        </Link>
      </div>
    </PageLayout>
  );
};

export default Page;
