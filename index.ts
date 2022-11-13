import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import { root_handler, get_messages, post_message } from "./src/mod.ts";
import { log_request } from "./model/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { PORT } = config();

const router: Router = new Router();
router.get("/", root_handler);
router.get("/message", get_messages);
router.post("/message", post_message);

const app: Application = new Application();
app.use(log_request);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
	"listen",
	(e) => console.log("Listening on http://localhost:8080"),
);

await app.listen(`localhost:${PORT}`);
