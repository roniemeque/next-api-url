import { NextPageContext, NextApiRequest } from "next";

const isClientSide = () => typeof window !== "undefined";

const findProtocol = (req: NextApiRequest) => {
  // check if req.protocol
  // check if 'x-now-deployment-url', use https:
  // check development or localhost
};

const findHost = (req: NextApiRequest) => {};

// handle server side
// getServerSideProps
// getStaticProps

// handle client side
// getInitialProps

export const getAbsoluteUrl = (
  ctx?: NextPageContext | { req: NextApiRequest } | null | undefined
) => {
  return "";
};

export const withAbsoluteUrl = () => null;

export default getAbsoluteUrl;
