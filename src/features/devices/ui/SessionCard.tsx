import React from "react";

import { Card, Typography } from "@byte-creators/ui-kit";

import { useSessionCard } from "../model/useSessionCard";

type Props = {
  action?: React.ReactNode;
  browserName: string;
  ip: string;
  lastVisit?: string;
  osName?: string;
  type: "browser" | "device";
};

export const SessionCard = ({
  action,
  browserName,
  ip,
  lastVisit,
  osName,
  type,
}: Props) => {
  const { icon, lastVisitDate, t, title } = useSessionCard({
    browserName,
    lastVisit,
    osName,
    type,
  });

  return (
    <Card className={"flex p-6 pt-[18px] justify-between"}>
      <div className={"flex gap-3"}>
        <div className={"mt-[6px]"}>{icon}</div>
        <div>
          <Typography variant={"h2"}>{title}</Typography>
          <Typography className={"mt-3"}>IP: {ip}</Typography>
          {!!lastVisit && (
            <Typography className={"mt-3"}>
              {t.lastVisit}: {lastVisitDate}
            </Typography>
          )}
        </div>
      </div>
      {!!action && <div className={"self-center"}>{action}</div>}
    </Card>
  );
};
