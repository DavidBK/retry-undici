import test from "node:test";
import assert from "node:assert/strict";
import { setGlobalDispatcher } from "undici";

import { agentRequest } from "../main.mjs";
import mockAgent from "./mock-retry-agent.mjs";

setGlobalDispatcher(mockAgent);

test("agentRequest", async () => {
  const result = await agentRequest();
  assert.deepStrictEqual(result, { message: "Hello, world?" });
});