import { Method } from "./../types";
import { orderService } from "../service/order.service";
import type { Order, Req, Res } from "../types";
import { sendResponse } from "../utiles";
import { url } from "node:inspector";
import { error, error } from "node:console";

export const orderRoute = async (req: Req, res: Res) => {
  const { params, url, method, body } =
    await extractRequestInfo<Omit<Order, "id">>(req);
  const orderId = params[1] || "";

  try {
    //   get all
    if (method === "GET" && !orderId) {
      const orders = await orderService.get();
      sendResponse(
        res,
        {
          message: "orders retrieved successfully",
          data: orders,
        },
        200,
      );
      return;
    }

    // get single

    if (method === "GET" && orderId) {
      const order = await orderService.getByID(orderId);
      // console.log(order);
      sendResponse(
        res,
        {
          message: order ? "Single order successfully" : "Order not found",
          data: order,
          error: order ? false : true,
        },
        order ? 200 : 404,
      );
    }

    // * delete

    if (method === "DELETE" && orderId) {
      const deleted = await orderService.delete(orderId);
      sendResponse(
        res,
        {
          message: deleted ? "Single deleted successfully" : "order not found",

          error: !deleted ? false : true,
        },
        deleted ? 200 : 404,
      );
      return;
    }

    // Post

    if (method === "POST" && body) {
      const newOrder = orderService.create(body);
      sendResponse(res, { message: "order created", data: newOrder }, 201);
      return;
    }
    // * PUT

    if (method === "PUT" && body) {
      const updated = await orderService.update(orderId, body);
      sendResponse(
        res,
        { message: updated ? "Order created" : "undefined", data: updated },
        updated ? 201 : 404,
      );
      return;
    }

    sendResponse(res, { message: "Not Found" }, 405);
  } catch (error) {
    sendResponse(
      res,
      { message: error instanceof Error ? error.message : "Server error" },
      500,
    );
  }
};

export const extractRequestInfo = async <T>(req: Req) => {
  const params = req.url?.split("/").filter(Boolean) ?? [];

  const body =
    req.method === "POST" || req.method === "PUT" || req.method === "PATCH"
      ? await parseBody<T>(req)
      : null;

  return {
    url: req.url ?? "/",
    params: params,
    method: req.method,
    body,
  };
};

const parseBody = async <T>(req: Req): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid data"));
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
};
