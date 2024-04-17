import { request, RetryAgent, Client } from "undici";

const url = "http://localhost:3000";
export async function main() {
  const { body } = await request(url);
  return await body.text();
}

const client = new Client(url);

const opts = {
  maxRetries: 5,
  timeout: 1,
  timeoutFactor: 1,
};

export const agent = new RetryAgent(client, opts);

export async function agentRequest() {
  const { body } = await agent.request({
    method: "GET",
    path: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await body.json();
}
