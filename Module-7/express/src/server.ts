import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 3000;

//when use express im server
app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_lvNTUbO2nWf6@ep-square-block-apey6rj8-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

app.get("/", (req: Request, res: Response) => {
  //   res.send("user server");

  res.status(200).json({
    massage: "murad is coming",
    coder: "murad bro",
  });
});

app.post("/", async (req: Request, res: Response) => {
  //   console.log(req.body);

  //   const body = req.body;
  const { name, email, password } = req.body;
  res.status(201).json({
    message: "Created",
    data: { name, email },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
