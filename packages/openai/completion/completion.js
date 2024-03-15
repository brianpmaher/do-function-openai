const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env["apiKey"],
});

async function main(args) {
  if (args.__ow_method !== "post") {
    return { body: "Please send a POST Request" };
  }

  if (!args.messages) {
    return { body: "messages is required" };
  }

  const completion = await openai.chat.completions.create({
    messages: args.messages,
    model: args.model || "gpt-3.5-turbo",
    max_tokens: args.max_tokens || null,
    n: args.n || 1,
    stream: args.stream || false,
    temperature: args.temperature || 1,
    top_p: args.top_p || 1,
    user: args.user || null,
  });

  return { body: completion };
}

exports.main = main;
