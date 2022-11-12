import { NewMessageRequest } from "./message.ts";

const DATA_FILE_PATH = "./data/data.json";

export async function fetch_message (): Promise<string> {
    return await Deno.readTextFile(DATA_FILE_PATH); 
}

export async function create_message (message: NewMessageRequest): Promise<void> {
    const curr_data_json: string = await Deno.readTextFile(DATA_FILE_PATH);
    const curr_data: Array<NewMessageRequest> = JSON.parse(curr_data_json);
    curr_data.push(message);
    const new_data_json = JSON.stringify(curr_data);
    Deno.writeTextFile(DATA_FILE_PATH, new_data_json);
}
