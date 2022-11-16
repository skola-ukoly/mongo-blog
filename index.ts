import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import { root_handler, get_messages, post_message, issue_handler, post_issue } from "./src/mod.ts";
import { log_request } from "./model/mod.ts";

const PORT = Deno.env.get("PORT");
console.log(PORT);

const router: Router = new Router();
router.get("/", root_handler);
router.get("/message", get_messages);
router.post("/message", post_message);
router.get("/issue", issue_handler);
router.post("/issue", post_issue);

const app: Application = new Application();
app.use(log_request);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", _ => console.log(`Listening on http://localhost:${PORT}`));

await app.listen(`localhost:${PORT}`);
