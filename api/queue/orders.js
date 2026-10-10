import { QueueClient } from "@vercel/queue";
const queue = new QueueClient();
export default queue.handleNodeCallback(async (message, metadata) => {
    console.log(`Message received ${JSON.stringify(message)}\n${metadata.messageId}, ${JSON.stringify(metadata)}`);
});
