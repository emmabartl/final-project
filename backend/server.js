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
	user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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

//authenticateUser,
app.post('/baths', authenticateUser, async (req, res) => {
  const accessToken = req.header('Authorization')
  const user = await User.findOne({ accessToken })

	const newBath = new Bath({ 
    user: user, 
    name: req.body.name, 
    coordinates: req.body.coordinates,
    rating: req.body.rating
  })
  await newBath.save()

  if (newBath) {
    res.json({
      success: true,
      user: newBath.user,
      name: newBath.name,
      coordinates: newBath.coordinates,
      rating: newBath.rating
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Could not create bath'
    })
  }
  // const { name, coordinates, rating } = req.body
  // const newBath = new Bath({ 
  //   name: req.body.name, 
  //   coordinates: req.body.coordinates
  // })
  
  // await newBath.save()
	// res.json(newBath)
})

app.post('/baths/:id/rate', async (req, res) => {
  const { id } = req.params

  try {
    const updatedBath = await Bath.findOneAndUpdate({ _id: id }, { $inc: { rating: 1 } }, { new: true })
    if (updatedBath) {
      res.json(updatedBath)
    }
  } catch (error) {
    res.status(404).json({ message: 'Bath not found' })
  }
})

app.delete('/baths/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedBath = await Bath.findByIdAndDelete(id)
    if (deletedBath) {
      res.json(deletedBath)
    } else {
      res.status(404).json({ message: 'Bath not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})