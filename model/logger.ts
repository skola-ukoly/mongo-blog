import { Context } from "https://deno.land/x/oak/mod.ts";

import { store_log } from "./db.ts";

export interface LogMessage {
    responseTime: string | null,
    method: string,
    path: URL,
    ipAddr: string
}

export async function log_request (ctx: Context, next: any): Promise<void> {
    await next();
    const log_message: LogMessage = {
        responseTime: ctx.response.headers.get("X-Response-Time"),
        method: ctx.request.method,
        path: ctx.request.url,
        ipAddr: ctx.request.ip,
    };
    
    store_log(log_message);
}
