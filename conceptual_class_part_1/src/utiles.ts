import type { Req, Res } from "./types";

export function sendResponse<T>(
  res: Res,
  { message, data, error }: { message: string; data?: T; error: boolean },
  status = 200,
) {
  res.writeHead(status, { "content-type": "application/json" });

  res.end(
    JSON.stringify({
      status: error ? false : true,
      message: message,
      data: error ? null : data,
    }),
  );
}
