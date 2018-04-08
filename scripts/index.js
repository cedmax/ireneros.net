
require('dotenv').config()
const fetch = require('./fetch');
const parse = require('./parse')
const save = require('./save');

(async () => {
  const content = await fetch(
    process.env.CONTENTFUL_SPACE,
    process.env.CONTENTFUL_KEY
  )

  await save(parse(content))
})()