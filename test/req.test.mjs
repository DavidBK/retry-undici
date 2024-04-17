import assert from "node:assert/strict";
import test from "node:test";
import { setGlobalDispatcher } from "undici";

import { req } from "../req.mjs ";
import mockAgent from "./mocks/mock-agent.mjs";

setGlobalDispatcher(mockAgent);

test("req test", async (t) => {
  await t.test("req test 1", async () => {
    const res = await req();
    const expected = {
      message: "Hello, world?",
    };
    assert.deepEqual(res, JSON.stringify(expected));
  });

  await t.test("req test 2", async () => {
    const res = await req();
    const expected = {
      message: "Hello, world 2",
    };
    assert.deepEqual(res, JSON.stringify(expected));
  });
});
