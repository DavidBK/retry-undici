import { Client, RetryAgent, Agent } from "undici";

const url = "http://localhost:3000";

const opt = {
  maxRetries: 5,
  timeout: 1,
  timeoutFactor: 1,
};

let retryAgent;

export function init(agent = new Agent()) {
  retryAgent = new RetryAgent(agent, opt);
  return retryAgent;
}

export async function req() {
  const { body } = await retryAgent.request({
    origin: url,
    method: "GET",
    path: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await body.json();
}
