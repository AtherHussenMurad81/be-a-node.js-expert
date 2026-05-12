import { createServer } from "http";

const server = createServer((req, res) => {
  const url = req.url ?? "/";
  if (url === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "hkjahk",
      }),
    );
  } else {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "massge not found",
      }),
    );
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is running on the PORT: ${PORT}`);
});
