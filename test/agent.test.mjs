import assert from "node:assert/strict";
import test from "node:test";
import { setGlobalDispatcher } from "undici";

import { req } from "../retry-agent.mjs";
import mockAgent from "./mocks/mock-retry-agent.mjs";

setGlobalDispatcher(mockAgent);

test("agentRequest", async () => {
  const result = await req();
  assert.deepStrictEqual(result, { message: "Hello, world" });
});
