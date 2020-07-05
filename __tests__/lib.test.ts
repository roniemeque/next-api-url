/**
 * @jest-environment node
 */

import { getApiUrl } from "../src";
import { IncomingMessage } from "http";

describe("validator tests", () => {
  test("should output correct url in localhost", () => {
    expect(
      getApiUrl({
        req: {
          headers: {
            host: "localhost:3000",
          },
        },
      } as { req: IncomingMessage })
    ).toEqual("http://localhost:3000/api");
  });

  test("should output correct url in production", () => {
    expect(
      getApiUrl({
        req: {
          headers: {
            host: "library.com",
          },
        },
      } as { req: IncomingMessage })
    ).toEqual("https://library.com/api");

    expect(
      getApiUrl({
        req: {
          headers: {
            host: "library.com",
            "x-now-deployment-url": "library.vercel.com",
          },
        },
      } as { req: IncomingMessage & { headers: any } })
    ).toEqual("https://library.com/api");

    expect(
      getApiUrl({
        req: {
          headers: {
            "x-forwarded-host": "library.com",
          },
        },
      } as { req: IncomingMessage & { headers: any } })
    ).toEqual("https://library.com/api");
  });

  test("should use defined protocol when in custom server", () => {
    expect(
      getApiUrl({
        req: {
          headers: {
            host: "library.com",
          },
          protocol: "https",
        },
      } as { req: IncomingMessage & { protocol: string } })
    ).toEqual("https://library.com/api");

    expect(
      getApiUrl({
        req: {
          headers: {
            host: "library.com",
          },
          protocol: "http",
        },
      } as { req: IncomingMessage & { protocol: string } })
    ).toEqual("http://library.com/api");
  });
});
