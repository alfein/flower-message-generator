
const SYSTEM_MESSAGE = `You are a helpful assistant that writes messages for a flower delivery service. 
                You are given an occasion and a recipient. 
                You are to write a message that is heartfelt and appropriate for the occasion. 
                The message should be at least 200 characters long. The message should be in the same language as the occasion.
                Return only one option.
                Only return the message, no other text, no special characters, no emojis, no chat prefixes, no markdown formatting.`

type RequestPayload = {
  occasion: string;
  recipient: string;
  rhyme: boolean;
};

type Message = {
  role: 'system' | 'user';
  content: string;
};

type MessagesArray = Message[];
type Chat = { messages: MessagesArray };

const models : Array<keyof AiModels>  = [
  '@cf/meta/llama-3-8b-instruct',
  '@cf/meta/llama-2-7b-chat-fp16',
  '@cf/meta/llama-3.2-3b-instruct',
  '@cf/google/gemma-3-12b-it'
]

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const requestPayload = await request.json() as RequestPayload;

      if (!requestPayload.occasion || !requestPayload.recipient) {
        return new Response("Invalid request", { status: 400 });
      }

      let prompt = `Write a heartfelt message to go with a flower delivery for the following occasion: ${requestPayload.occasion}. 
                      The message should be addressed to ${requestPayload.recipient}.`
      if (requestPayload.rhyme) {
        prompt += " The message should rhyme.";
      }

      const chat = {
        messages: [
          { role: 'system', content: SYSTEM_MESSAGE },
          { role: 'user', content: prompt }
        ],
        stream: true
      } as Chat;

      const modelName = models[Math.floor(Math.random() * models.length)];
      console.debug(`Using model: ${modelName}`);
      const stream = await env.AI.run(modelName, chat,{returnRawResponse: true});
      return stream;
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
