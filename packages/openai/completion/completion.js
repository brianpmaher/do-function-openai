const OpenAI = require("openai");

const apiKey = process.env["apiKey"];
if (!apiKey) {
  console.error("apiKey is required");
}

const openai = new OpenAI({ apiKey });
if (!openai) {
  console.error("openai is required");
}

exports.main = async (event) => {
  if (!apiKey) {
    return { body: "apiKey is required" };
  }

  if (!openai) {
    return { body: "openai is required" };
  }

  if (event.__ow_method !== "post") {
    return { body: "Please send a POST Request" };
  }

  if (!event.messages) {
    return { body: "messages is required" };
  }

  const debugLog = event.debug_log || false;

  if (debugLog) {
    console.log("event", event);
  }

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

  if (debugLog) {
    console.log("completion", completion);
  }

  return { body: completion };
};
