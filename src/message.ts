import { Context } from "https://deno.land/x/oak/mod.ts";
import { fetch_message, create_message, NewMessageRequest } from "./../model/mod.ts";

export async function get_messages (ctx: Context): Promise<void> {
    const messages = await fetch_message();

    ctx.response.status = 200;
    ctx.response.headers.append("Content-Type", "application/json");
    ctx.response.body = messages;
}

export async function post_message (ctx: Context): Promise<void> {
    const message: NewMessageRequest = await ctx.request.body().value;

    await create_message(message);

    ctx.response.status = 200;
}