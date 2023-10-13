const service = require("./service")

if (process.argv.length !== 4) {
  console.error('Expected exactly 2 arguments!');
  process.exit(1);
}

const productId = process.argv[2]
const question = process.argv[3]

service.askAboutProduct(productId, question)
  .catch(error => console.log(error))
  .then(answer => console.log(answer))