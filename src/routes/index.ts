import express from "express";
import { img } from "./api/resize";

const route = express.Router();

route.use("/resize", img);

route.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Choose an endpoint");
});

export default route;
