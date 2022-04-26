// Requires
const express = require('express')
const mongodb = require('mongodb')
const path = require('path')
const MongoClient = mongodb.MongoClient


// init
const app = express()
const port = 3000
app.use(express.json())
app.use(express.static('public'))

// DB Connection
async function connectToDB() {
    const client = await MongoClient.connect('mongodb://localhost:27017') 
    const db = client.db('week13')
    return db
}


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

/**
 * Retrieve all tweets from the database
 */
app.get('/api/tweets', async (req, res) => {
    // connect to the database
    const db = await connectToDB()

    // grab the data from the collection
    const collection = await db.collection('tweets')
    const data = await collection.find({}).toArray()
    
    // return the data as a JSON object
    res.json(data)
})

/**
 * Posts tweet submissions, which get stored in the database
 */
app.post('/api/tweets', async (req, res) => {
    // connect to the database
    const db = await connectToDB()

    // use the collection
    const collection = await db.collection('tweets')

    // get the tweet text from the request
    const text = req.body.text
    // store the tweet in the MongoDB database
    const tweet = await collection.insertOne({text})
    // return the tweet as a JSON object
    res.send({
        status: true,
        textResponse: 'Tweet has been inserted!'
    })
})



// Other
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})