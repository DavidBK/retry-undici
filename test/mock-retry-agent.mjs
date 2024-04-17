import { MockAgent } from "undici";
import { agent } from "../main.mjs";

const url = "http://localhost:3000";
const mockAgent = new MockAgent({ agent: agent._agent });
mockAgent.disableNetConnect();

const mockClient = mockAgent.get(url);
const intercept = mockClient.intercept({
  path: "/",
  method: "GET",
});

intercept.reply(500, { message: "Hello, world?" });
intercept.reply(200, { message: "Hello, world?" });
export default mockAgent;
