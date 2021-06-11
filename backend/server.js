import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/BadenBaden"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const bathSchema = new mongoose.Schema({
	name: String,//add validation?	
	coordinates: {
		lat: Number,
		lng: Number,
	},
	rating: {	//waves?
		type: Number,
		default: 0
	},
	createdAt: { //other ways to make this?
		type: Date,
		default: Date.now
	}
})

const Bath = mongoose.model('Bath', bathSchema)

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/bath', async (req, res) => {
	const newBath = await new Bath({ name: req.body.name }).save()
	res.json(newBath)

	// const { name } = req.body
	// console.log(name)
})
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})