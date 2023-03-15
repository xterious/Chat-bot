const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const port = 5000
app.post('/',async (req,res)=>{
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.message,
      max_tokens: 50,
      temperature: 0.3,
    });
    res.json({
      data: response.data   
    })
});
app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
});