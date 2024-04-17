import { MockAgent, MockClient } from "undici";
import * as retryAgent from "../../retry-agent.mjs";

const url = "http://localhost:3000";

const mockClient = new MockClient(url, { agent: retryAgent.init() });
retryAgent.init(mockClient);

const intercept = mockClient.intercept({
  path: "/",
  method: "GET",
});

intercept.reply(500, { message: "should not print" });
intercept.reply(200, { message: "Hello, world" });

export default mockClient;
