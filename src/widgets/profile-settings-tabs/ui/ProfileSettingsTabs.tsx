import { useEffect } from "react";

import { LocationsProps } from "@/pages/profile/[id]/settings";
import { useScopedTranslation } from "@byte-creators/utils";
import { TabsBase } from "@byte-creators/ui-kit";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const EditProfileForm = dynamic(
  () => import("@/features/edit-profile").then((mod) => mod.EditProfileForm),
  { ssr: true },
);

const AccountManagement = dynamic(
  () => import("@/features/payments").then((mod) => mod.AccountManagement),
  { ssr: true },
);

const CurrentDevice = dynamic(
  () => import("@/features/devices").then((mod) => mod.CurrentDevice),
  {
    ssr: true,
  },
);
const SessionsList = dynamic(
  () => import("@/features/devices").then((mod) => mod.SessionsList),
  {
    ssr: true,
  },
);
const MyPayments = dynamic(
  () =>
    import("@/features/payments/ui/MyPayments").then((mod) => mod.MyPayments),
  { ssr: true },
);

type TabValues =
  | "account-management"
  | "devices"
  | "general-information"
  | "my-payments";

export const ProfileSettingsTabs = ({ cities, countries }: LocationsProps) => {
  const t = useScopedTranslation("Navigation");
  const router = useRouter();
  const selectedTab = (router.query.tab as TabValues) || "general-information";
  const handleTabChange = (value: TabValues) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          tab: value,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (router.query.success === "false") {
      console.error("Transaction failed, please try again");
    }
  }, [router.query.success]);

  return (
    <TabsBase<TabValues>
      ariaLabel={"profile management tabs"}
      onClick={handleTabChange}
      tabsData={[
        {
          content: <EditProfileForm cities={cities} countries={countries} />,
          label: t.generalInfo,
          value: "general-information",
        },
        {
          content: (
            <div className={"flex flex-col gap-[18px]"}>
              <CurrentDevice />
              <SessionsList />
            </div>
          ),
          label: t.devices,
          value: "devices",
        },
        {
          content: <AccountManagement />,
          label: t.accountManagement,
          value: "account-management",
        },
        {
          content: <MyPayments />,
          label: t.myPayments,
          value: "my-payments",
        },
      ]}
      value={selectedTab}
    />
  );
};
