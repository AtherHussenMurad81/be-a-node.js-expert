import { createServer } from "http";
import { sendResponse } from "./utiles";
import { orderRoute } from "./routes/order.route";
import type { Req } from "./types";

const server = createServer(async (req, res) => {
  const url = req.url ?? "/";
  if (url === "/") {
    sendResponse(res, { message: "welcome to out home server" });
    return;
  } else if (url.startsWith("/order")) {
    await orderRoute(req as Req, res);
    return;
  }
  sendResponse(res, { message: "Server cannot found" });
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is running on the PORT: ${PORT}`);
});
