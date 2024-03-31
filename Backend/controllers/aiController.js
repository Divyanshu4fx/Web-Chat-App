const OpenAI = require("openai");

const {io} = require("../socket/socket");
const Convsersation = require("../models/conversationModel");
const Message = require("../models/messageModel");


const openai = new OpenAI({
    apiKey: "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" || "-",
  });

const aiListenAndSend = async (req, res) => {
    const { message } = req.body;
    const senderId = req.user._id;
    // console.log(req);
    const reciverId  = "660913e18dba4e4ba213aafa";
    let conversationHistory = [];
    conversationHistory.push({ role: "user", "content": message });
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            seed: 1,
            max_tokens: 1000,
            temperature: 0.6,
            response_format: {
                type: "json_object",
            },
            messages: [
                {
                    role: "system",
                    content: `You are a friendly Chat Bot.
                              You are Humors and cheerfull.
                              You will always reply with a JSON object of message. With a maximum length of message not more than 50 words.
                              You can also use emojis.
                              `,
                },
                {
                    role: "user",
                    content: message,
                },
                ...conversationHistory,
            ],
        });
        let messages = JSON.parse(completion.choices[0].message.content);
        conversationHistory.push({"role": "assistant", "content": messages.message});
        console.log(conversationHistory);
        res.status(200).json(messages);
    }
    catch (e) {
        console.log("Error in AI controller");
        res.status(500).JSON({error : "Internal Server Error"});
    }
}

module.exports = { aiListenAndSend };