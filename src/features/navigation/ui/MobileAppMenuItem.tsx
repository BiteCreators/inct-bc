import React from "react";

import { cn } from "@byte-creators/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  disabled?: boolean;
  href: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
};

export const MobileAppMenuItem = ({
  disabled,
  href,
  icon,
  iconActive,
}: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        className={cn(
          "transition-colors delay-[10ms]",
          isActive && "text-primary-500",
          disabled && "text-dark-100",
        )}
        href={href}
      >
        {isActive ? iconActive : icon}
      </Link>
    </li>
  );
};
