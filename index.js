require('dotenv').config()
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(express.json());

app.post('/ai/review-and-rephrase', async(req, res) => {
  const data = req.body;
  const text = "review and rephrase:\n"+data.text;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).send(response.data.choices[0].text);
});

// generic promt to generate text 
app.post('/generic-completion/:promt', async(req , res) => {
    const data = req.body;
    const action = req.params.promt;
    if(!req.body.text){
        res.status(400).send("there is no text");
    }
    const text = action +": \n" + req.body.text;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      res.status(200).send(response.data.choices[0].text);
})

app.listen(3000, () => console.log('Server started on port 3000'));
