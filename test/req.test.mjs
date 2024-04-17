import test from "node:test";
import assert from "node:assert/strict";
import { setGlobalDispatcher } from "undici";

import { main } from "../main.mjs";
import mockAgent from "./mock-agent.mjs";

setGlobalDispatcher(mockAgent);

test("test for test", () => {
  assert.equal(1, 1);
});

test("async test", async () => {
  const actual = await Promise.resolve(1);
  const expected = 1;
  assert.equal(actual, expected);
});

test("main test", async (t) => {
  await t.test("main test 1", async () => {
    const res = await main();
    const expected = {
      message: "Hello, world?",
    };
    assert.deepEqual(res, JSON.stringify(expected));
  });

  await t.test("main test 2", async () => {
    const res = await main();
    const expected = {
      message: "Hello, world 2",
    };
    assert.deepEqual(res, JSON.stringify(expected));
  });
});
