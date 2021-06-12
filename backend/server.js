import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/BadenBaden"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
mongoose.Promise = Promise


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true, 
		minlength: 5,
		maxlength: 15,
		unique: true,
		trim: true
	},
	password: {
		type: String, 
		required: true,
	},
	accessToken: {
		type: String, 
		default: () => crypto.randomBytes(128).toString('hex')
	}
})

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

const User = mongoose.model('User', userSchema)

const Bath = mongoose.model('Bath', bathSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.post('/users', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = new User({
      username,
      password: bcrypt.hashSync(password, salt)
    })
		await newUser.save()
    res.json({
      success: true,
      userId: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Could not create user',
      error
    })
  }
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