import { createServer, IncomingMessage, Server } from "http";
import { json } from "stream/consumers";

// 1 server Create
const server: Server = createServer((req: IncomingMessage, res) => {
  // console.log(req.url); '/', '/user'
  // console.log(req.method); //get, post, put and delete

  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    // console.log("this is root route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route is  found" }));
    // * must be string or buffer object
  } else if (url?.startsWith("/products")) {
    res.writeHead(200, { "content-type": "application/json" });

    res.end(
      JSON.stringify({
        message: "products page found",
      }),
    );
  }

  // else {
  //   res.writeHead(404, { "content-type": "application/json" });
  //   res.end(JSON.stringify({ message: "Route is not found" }));
  // }
});

// 2 server listen

server.listen(5000, () => {
  console.log("server is running on the port 5000");
});
