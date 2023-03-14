const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const configuration = new Configuration({
    organization: "org-gfkIkcpbfzZFRkdM5bzBY9bn",
    apiKey: "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",
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
      // stop: "\n", 
      temperature: 0.3,
    });
    // console.log(req.body.message);
    // console.log(response.data.choices[0].text);
    res.json({
      data: response.data   
    })
});
app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
});