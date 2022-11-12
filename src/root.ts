import { Context, ContextSendOptions, send } from "https://deno.land/x/oak/mod.ts" ;

const ROOT_DIR = "./public";
const FILE_PATH = "/index.html";

export async function root_handler (ctx: Context): Promise<void> {
	const options: ContextSendOptions = {
		root: ROOT_DIR,
	};
	await send(ctx, FILE_PATH, options);
}
