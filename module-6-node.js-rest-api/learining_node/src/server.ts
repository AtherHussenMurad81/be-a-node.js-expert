import { createServer, IncomingMessage, Server } from "http";

import { routeHandler } from "./routes/route";

// 1 server Create
const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

// 2 server listen

server.listen(5000, () => {
  console.log("server is running on the port 5000");
});
