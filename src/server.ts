import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import * as logger from "koa-logger";
import healtcheckRoutes from "./routes/healtcheck";
import { config } from "./config";

const app = new Koa();
const PORT = config.port;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());

app.use(healtcheckRoutes.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;
