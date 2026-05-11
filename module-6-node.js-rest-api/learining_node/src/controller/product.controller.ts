import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  if (url?.startsWith("/products") && method === "GET") {
    // const data = [
    //   {
    //     id: 56454,
    //     name: "Ather accounting",
    //   },
    // ];
    const data = readProduct();

    // readProduct();
    res.writeHead(200, { "content-type": "application/json" });

    res.end(
      JSON.stringify({
        message: "products page successfully",
        data: data,
      }),
    );
  }
};
