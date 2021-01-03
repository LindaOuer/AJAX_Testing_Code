// 1. use the command: npm init
// 2. install the packages: npm i express body-parser cors
// 3. to test the express server use the following command in the terminal: node app.js
const express = require('express')

const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

// 4. add the router
const apiRouter = require('./api/apiRouter.js')

const hostname = '127.0.0.1'
const port = 3000

// configure body-parser
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlEncodedParser)

//configure cors
app.use(cors())


// 5. configure the router 
app.use('/api', apiRouter)

// get

app.get('/', (request, response) => {
    response.send('<h2> Testing express server </h2>')
})

app.listen(port, hostname, () => {
    console.log(`Express Server is started at http://${hostname}:${port}`)
})