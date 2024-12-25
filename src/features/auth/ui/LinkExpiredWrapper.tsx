import React from "react";

import { useScopedTranslation } from "@byte-creators/utils";
import { Typography } from "@byte-creators/ui-kit";
import Image from "next/image";

type Props = {
  button?: React.ReactNode;
};

export const LinkExpiredWrapper = ({ button }: Props) => {
  const t = useScopedTranslation("Auth");

  return (
    <div className={"-mt-4 sm:mt-0 flex flex-col items-center"}>
      <div className={"flex flex-col w-screen max-w-[310px] text-center"}>
        <Typography variant={"h2"}>{t.verificationLinkExpired}</Typography>
        <Typography className={"mt-[19px] mb-[30px]"} variant={"regular-text"}>
          {t.verificationLinkExpiredBody}
        </Typography>
      </div>
      <div className={"max-w-[310px] sm:order-1 order-2"}>{button}</div>
      <Image
        alt={"image"}
        className={"max-w-[473px] sm:mt-8 mb-8 sm:order-2 order-1"}
        height={353}
        layout={"responsive"}
        src={"/images/rafiki.svg"}
        width={473}
      />
    </div>
  );
};
