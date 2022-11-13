import { Context } from "https://deno.land/x/oak/mod.ts";
import { fetch_messages, store_message, Message } from "./../model/mod.ts";

export async function get_messages (ctx: Context): Promise<void> {
    const messages = await fetch_messages();
	console.log(messages);

    ctx.response.status = 200;
    ctx.response.headers.append("Content-Type", "application/json");
    ctx.response.body = messages;
}

export async function post_message (ctx: Context): Promise<void> {
    const message: Message = await ctx.request.body().value;
    await store_message(message);

    ctx.response.status = 200;
}
