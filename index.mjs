import { createServer } from "node:http";
import { req as normalReq } from "./req.mjs";
import * as retryAgent from "./retry-agent.mjs";

const server = createServer();

let counter = 0;
server.on("request", (req, res) => {
  switch (counter++) {
    case 0:
      res.writeHead(500);
      res.end("should print failure!");
      return;
    case 1:
      req.destroy();
      return;
    default:
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello World" }));
  }
});

retryAgent.init();

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  normalReq()
    .then(console.log)
    .then(() => retryAgent.req())
    .then(console.log)
    .then(() => server.close());
});
