import { MockAgent } from "undici";

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();

const client = mockAgent.get("http://localhost:3000");

const intercept = client.intercept({
	path: "/",
	method: "GET",
});

intercept.reply(200, { message: "Hello, world?" });
intercept.reply(200, { message: "Hello, world 2" });

export default mockAgent;
