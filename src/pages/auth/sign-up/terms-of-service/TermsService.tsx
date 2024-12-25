import React from "react";

import { NextPageWithLayout } from "@/pages/_app";
import { Header } from "@/widgets/header";
import {
  ArrowBackOutline,
  PageLayout,
  Typography,
} from "@byte-creators/ui-kit";
import { useScopedTranslation } from "@byte-creators/utils";
import Link from "next/link";

const TermsService: NextPageWithLayout = () => {
  const t = useScopedTranslation("TermsService");

  return (
    <div>
      <div className={"relative flex justify-center md:block md:min-h-[85px]"}>
        <Link
          className={"absolute left-[15px] md:left-16 md:inline-flex gap-3"}
          href={"/auth/sign-up"}
        >
          <ArrowBackOutline />
          <span className={"hidden md:inline text-sm font-normal leading-6"}>
            Back to Sign Up
          </span>
        </Link>
        <Typography
          className={"md:relative top-[45px] text-lg text-center md:text-xl"}
          variant={"h1"}
        >
          {t.title}
        </Typography>
      </div>
      <Typography
        className={"text-sm mx-[15px] mt-5 leading-6 md:mx-40 text-center"}
        variant={"regular-text"}
      >
        {t.text}
      </Typography>
    </div>
  );
};

TermsService.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={"mb-5"}>
      {page}
    </PageLayout>
  );
};
export default TermsService;
