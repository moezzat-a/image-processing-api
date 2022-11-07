import express from "express";
import route from "./routes/index";

const app = express();
const port = 5000;

app.use("/api", route);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;
