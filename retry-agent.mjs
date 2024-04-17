import { Client, RetryAgent } from "undici";

const url = "http://localhost:3000";

const defaultsOpt = {
  maxRetries: 5,
  timeout: 1,
  timeoutFactor: 1,
};

export let agent;

export function init(client = new Client(url), opts = defaultsOpt) {
  agent = new RetryAgent(client, opts);
  return agent;
}

export async function req() {
  const { body } = await agent.request({
    method: "GET",
    path: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await body.json();
}
