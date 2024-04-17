import { createServer } from "node:http";
import { main, agentRequest } from "./main.mjs";

const server = createServer();

let counter = 0;
server.on("request", (req, res) => {
  switch (counter++) {
    case 0:
      res.writeHead(500);
      res.end("failed");
      return;
    case 1:
      req.destroy();
      return;
    default:
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello World" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  main()
    .then(console.log)
    .then(() => agentRequest())
    .then(console.log)
    .then(() => server.close());
});
