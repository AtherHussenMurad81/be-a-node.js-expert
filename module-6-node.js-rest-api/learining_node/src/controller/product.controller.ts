import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlPart = url?.split("/");
  // console.log(urlPart);
  const id = urlPart && urlPart[1] === "products" ? Number(urlPart[2]) : null;
  console.log("this is the  id: ", id);
  // console.log(id);
  if (url === "/products" && method === "GET") {
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
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    console.log(product);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrived successfully",
        data: product,
      }),
    );
  }
};
