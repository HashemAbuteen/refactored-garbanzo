require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

// generic promt to generate text 
app.post('/generic-completion/:promt', async(req , res) => {
    const data = req.body;
    const action = req.params.promt;

    if(!req.body.text){
        console.log("No text was provided in the request body");
        return res.sendStatus(400);
    }

    if(!process.env.OPENAI_API_KEY) {
        console.log("The environment variable for OpenAI API key is not set");
        return res.sendStatus(200);
    }

    const text = action +": \n" + req.body.text;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        if(!response.data.choices[0].text) {
            console.log("The response from OpenAI does not contain the 'text' property");
            return res.sendStatus(500);
        }

        res.status(200).send(response.data.choices[0].text);
    } catch (error) {
        console.log(`An error occurred while calling the OpenAI API: ${error}`);
        return res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
