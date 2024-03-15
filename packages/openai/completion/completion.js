const OpenAI = require("openai");

exports.main = async (event) => {
  if (event.__ow_method !== "post") {
    return { body: "Please send a POST Request" };
  }

  if (!event.messages) {
    return { body: "messages is required" };
  }

  const openai = new OpenAI({
    apiKey: process.env["apiKey"],
  });

  const completion = await openai.chat.completions.create({
    messages: event.messages,
    model: event.model || "gpt-3.5-turbo",
    max_tokens: event.max_tokens || null,
    n: event.n || 1,
    stream: event.stream || false,
    temperature: event.temperature || 1,
    top_p: event.top_p || 1,
    user: event.user || null,
  });

  return { body: completion };
};
