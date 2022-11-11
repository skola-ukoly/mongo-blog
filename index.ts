import { Application } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import { root_handler } from "./src/mod.ts";

//const port: number = Deno.env.get("port");
const port = 8000;

const app: Application = new Application();

app.use(root_handler);

await app.listen({ port: port });
console.log(`up on port: ${port}`);
