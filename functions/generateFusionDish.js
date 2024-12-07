const axios = require("axios");

exports.handler = async (event) => {
  const { country1, country2 } = JSON.parse(event.body);

  const payload = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a world-class chef. Generate a fusion dish recipe.",
      },
      {
        role: "user",
        content: `Combine cuisines from ${country1} and ${country2}.`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].message.content),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
