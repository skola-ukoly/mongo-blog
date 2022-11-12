import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { LogMessage } from "./logger.ts" 



const DATA_FILE_PATH = "./data/data.json";

const { MONGO_API_ENDPOINT, MONGO_API_KEY } = config();

const CLUSTER = "wa-chat";

const LOG_DATABASE = "logs";
const LOG_COLLECTION = "connections";

const DATA_DATABASE = "data";
const DATA_COLLECTION = "messages";



interface Message {
    message: string
}



export async function fetch_message (): Promise<Array<Message>> {
    
    return []
}

export async function post_message (message: Message): Promise<void> {}

export async function post_log (log: LogMessage): Promise<void> {} 