import { GoogleSvgrepoCom1 } from "@byte-creators/ui-kit/icons";
import Link from "next/link";

export const GoogleOauthButton = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_BASE_URL!;
  const scope = "email profile";
  const responseType = "code";

  const googleHref = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  return (
    <Link href={googleHref}>
      <GoogleSvgrepoCom1 height={"36px"} viewBox={"0 0 24 24"} width={"36px"} />
    </Link>
  );
};
