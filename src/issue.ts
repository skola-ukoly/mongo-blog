import { Context, ContextSendOptions, send } from "https://deno.land/x/oak/mod.ts" ;

const ROOT_DIR = "./public";
const FILE_PATH = "/issue.html";

interface Issue {
	contant: string,
	issue: string,
}

export async function issue_handler (ctx: Context) {
	const options: ContextSendOptions = {
		root: ROOT_DIR,
	};
	await send(ctx, FILE_PATH, options);
}

export async function post_issue (ctx: Context) {
	const req = ctx.request;

}
