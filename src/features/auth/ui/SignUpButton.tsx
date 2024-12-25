import { useScopedTranslation } from "@byte-creators/utils";
import { Button } from "@byte-creators/ui-kit";
import Link from "next/link";

type Props = {
  variant?: "primary" | "text";
};

export const SignUpButton = ({ variant = "primary" }: Props) => {
  const t = useScopedTranslation("Auth");

  return (
    <Button asChild className={"mx-auto"} variant={variant}>
      <Link href={"/auth/sign-up"}>{t.signUp}</Link>
    </Button>
  );
};
