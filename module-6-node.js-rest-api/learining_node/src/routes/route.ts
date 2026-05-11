import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  // console.log(req.url); '/', '/user'
  // console.log(req.method); //get, post, put and delete

  const url = req.url;
  //   console.log(url);
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "home route is  found" }));
    // * must be string or buffer object
  } else if (url === "/products") {
    productController(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route is not found" }));
  }
};
