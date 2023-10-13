const OpenAI = require('openai')

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const dataset = JSON.parse(require('fs').readFileSync('dataset.json'))

function productContent(productID, json) {
  let product = json.find((element) => element["product_csin"] === productID)
  return [product["product_attributes"],product["product_offers"]]
}

async function askAboutProduct(productId, message) {
  let product = productContent(productId, dataset)
  
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

  return chatCompletion.choices[0].message.content
}

exports.askAboutProduct = askAboutProduct