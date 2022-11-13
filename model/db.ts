import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { LogMessage } from "./logger.ts";

const { MONGO_API_ENDPOINT, MONGO_API_KEY } = config();

const DATA_FILE_PATH = "./data/data.json";

const CLUSTER = "wa-chat";

const LOG_DATABASE = "logs";
const LOG_COLLECTION = "connections";

const DATA_DATABASE = "data";
const DATA_COLLECTION = "messages";



export interface Message {
    message: string
}



export async function fetch_messages (): Promise<Array<Message>> {
	console.log(1);
	const URI = `${MONGO_API_ENDPOINT}/find`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"api-key": MONGO_API_KEY,
		},
		body: ""
	};
	const query = {
		dataSource: CLUSTER,
		database: DATA_DATABASE,
		collection: DATA_COLLECTION,
	};
	options.body = JSON.stringify(query);

	const messages_json = await fetch(URI, options);
	console.log(1, messages_json)
	const messages = await messages_json.json(); 
	console.log(2, messages)

	return messages
}

export async function store_message (message: Message): Promise<void> {
	const URI = `${MONGO_API_ENDPOINT}/insertOne`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"api-key": MONGO_API_KEY,
		},
		body: ""
	}; 
	const query = {
		dataSource: CLUSTER,
		database: DATA_DATABASE,
		collection: DATA_COLLECTION,
		document: message
	};
	options.body = JSON.stringify(query);

	await fetch(URI, options);
}


export async function store_log (log: LogMessage): Promise<void> {
	const URI = `${MONGO_API_ENDPOINT}/insertOne`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"api-key": MONGO_API_KEY,
		},
		body: ""
	}; 
	const query = {
		dataSource: CLUSTER,
		database: LOG_DATABASE,
		collection: LOG_COLLECTION,
		document: log
	};
	options.body = JSON.stringify(query);

	await fetch(URI, options);
} 
