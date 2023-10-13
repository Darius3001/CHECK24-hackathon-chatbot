const OpenAI = require('openai')

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const dataset = JSON.parse(require('fs').readFileSync('dataset.json'))

async function askAboutProduct(productId, message) {
  let product = dataset.find(el => el.product_csin == productId)
  
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { 
        role: 'system', 
        content: `You are CHECK24 chatbot. You have to guide the user with the following product. ${JSON.stringify(product)}` 
      },
      {
        role: 'user',
        content: message
      }
    ],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0]
}


async function test() {
  let r = await askAboutProduct("C8F5BF749364C7", "Wieviel kostet das?")
  console.log(r)
}

test()
exports.askAboutProduct = askAboutProduct