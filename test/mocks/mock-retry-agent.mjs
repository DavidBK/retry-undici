import { MockAgent } from "undici";
import * as retryAgent from "../../retry-agent.mjs";

const url = "http://localhost:3000";

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();

retryAgent.init(mockAgent);

const mockClient = mockAgent.get(url);

const intercept = mockClient.intercept({
  path: "/",
  method: "GET",
});

intercept.reply(500, { message: "should not print" });
intercept.reply(200, { message: "Hello, world" });

export default mockClient;
