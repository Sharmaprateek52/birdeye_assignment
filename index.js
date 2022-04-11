const express = require('express')
const crawler = require('./controller/crawler.js')
const app = express()
const port = 3000

//Get api
app.get('/', async (req, res) => {
  //controller for crawler
  let data = await crawler.getReviews();
  res.send(JSON.stringify(data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// First -> npm i
// Then start the project by -> npm start
// Get the response at localhost:3000
