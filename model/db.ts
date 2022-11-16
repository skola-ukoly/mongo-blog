import { LogMessage } from "./logger.ts";

const env1 = Deno.env.get("MONGO_API_ENDPOINT") 
const env2 = Deno.env.get("MONGO_API_KEY")

if (env1 === undefined || env2 === undefined) {
	throw "environment variables are not set properly"
} 

const MONGO_API_ENDPOINT: string = env1
const MONGO_API_KEY: string = env2

const CLUSTER = "WaChatDb";

const LOG_DATABASE = "logs";
const LOG_COLLECTION = "connections";

const DATA_DATABASE = "data";
const DATA_COLLECTION = "messages";



export interface Message {
    message: string
}

interface MongoMessage {
	_id: string,
	message: string
}



export async function fetch_messages (): Promise<Array<Message>> {
	const URI = `${MONGO_API_ENDPOINT}/action/find`;

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

	const data_json: Response = await fetch(URI, options);
	const data_mongo = await data_json.json(); 
	const messages_mongo: Array<MongoMessage> = data_mongo.documents;
	const messages: Array<Message> = messages_mongo.map(mongo_message => {return {message: mongo_message.message}});

	return messages
}

export async function store_message (message: Message): Promise<void> {
	const URI = `${MONGO_API_ENDPOINT}/action/insertOne`;

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
	const URI = `${MONGO_API_ENDPOINT}/action/insertOne`;

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
