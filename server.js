import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

//Kolla längden på objekt i apiet.
console.log(data.length)

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWin = req.query.win
  console.log(showWin)
  console.log({ year })
  let nominationsFromYear = data.filter((item) => item.year_award === +year)

  if (showWin) {
    nominationsFromYear = data.filter((item) => item.win)
  }
  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
