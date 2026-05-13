import type { IncomingMessage, ServerResponse } from "node:http";
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
import data from "../db/data.json" with { type: "json" };

export type Res = ServerResponse;
export type Req = IncomingMessage & {
  method: Method;
};

// export interface Order {
//   id: string;
//   customer: string;
//   quantity: number;
//   food: string;
//   price: number;
// }
export type Order = (typeof data)[number];
