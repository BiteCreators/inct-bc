import { useScopedTranslation } from "@byte-creators/utils";
import { Button } from "@byte-creators/ui-kit";
import Link from "next/link";

type Props = {
  variant?: "primary" | "text";
};

export const SignInButton = ({ variant = "text" }: Props) => {
  const t = useScopedTranslation("Auth");

  return (
    <>
      <Button asChild className={"mx-auto"} variant={variant}>
        <Link className={"text-center"} href={"/auth/sign-in"}>
          {t.signIn}
        </Link>
      </Button>
    </>
  );
};
