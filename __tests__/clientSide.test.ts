import { getApiUrl } from "../src";
import { IncomingMessage } from "http";

describe("client side tests", () => {
  test("should output correct url when in client side", () => {
    expect(
      getApiUrl({
        req: {
          headers: {
            host: "localhost:3000",
          },
        },
      } as { req: IncomingMessage })
    ).toEqual("/api");
  });
});
