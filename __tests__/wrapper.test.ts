/**
 * @jest-environment node
 */

import { withApiUrl } from "../src";
import { IncomingMessage } from "http";

describe("wrapper tests", () => {
  test("should wrap and return props", () => {
    expect(
      withApiUrl((ctx, url) => {
        return {
          props: {
            url,
          },
        };
      })({
        req: {
          headers: {
            host: "localhost:3000",
          },
        },
      } as { req: IncomingMessage })
    ).toEqual({
      props: {
        url: "http://localhost:3000/api",
      },
    });
  });
});
