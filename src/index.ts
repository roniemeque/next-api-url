import { IncomingMessage } from "http";

const isClientSide = () => typeof window !== "undefined";

const discoverHost = (req: IncomingMessage): string => {
  return req.headers.host || (req.headers["x-forwarded-host"] as string);
};

const discoverProtocol = (
  req: IncomingMessage & { protocol?: string },
  host: string
): string => {
  if (host.includes("localhost")) return "http";

  // if it is a Vercel deployment, this will probably be present and we can assume it is secure
  if (req.headers["x-now-deployment-url"]) return "https";

  // if Next.js is running on a custom server, like Express, req.protocol will probably be available
  return req["protocol"] || "https";
};

export const getApiUrl = (
  ctx?: { req: IncomingMessage } | null | undefined,
  apiSufix = true
) => {
  // checking if it is client side, in case of using getInitialProps
  if (isClientSide()) return apiSufix ? "/api" : "";

  if (!ctx?.req) {
    throw new Error("Invalid request");
  }

  const host = discoverHost(ctx?.req);
  const protocol = discoverProtocol(ctx?.req, host);

  return `${protocol}://${host}${apiSufix ? "/api" : ""}`;
};

export const withApiUrl = (
  f: (ctx: { req: IncomingMessage }, url: string) => { props: any } | any
) => (ctx: { req: IncomingMessage }) => f(ctx, getApiUrl(ctx));

export default getApiUrl;
