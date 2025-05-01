import { getApiKey } from "../utils/secureStorage";

const grokApiBaseUrl = "https://api.x.ai/v1/chat/completions";

export const sendGrokMessage = async (
  systemPrompt,
  contextData,
  userMessage
) => {
  // Retrieve the API key securely
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("Grok API key not found");
  }

  // Construct the request payload
  const requestBody = {
    messages: [
      {
        role: "system",
        content: `${systemPrompt}\nContext Data: ${JSON.stringify(
          contextData
        )}`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "grok-3-mini-beta",
    stream: false,
    temperature: 0,
  };

  try {
    const response = await fetch(grokApiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Invalid response from Grok API");
    }
  } catch (error) {
    console.error("Grok API error:", error.message);
    throw error;
  }
};
