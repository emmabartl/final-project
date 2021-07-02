import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/BadenBaden"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
mongoose.Promise = Promise


// The port the app will run on
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)
      },
      message: 'Please enter a valid email address'
    }
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
  name: String,	
	coordinates: {
		lat: Number,
		lng: Number,
	},
	rating: {	
		type: Number,
		default: 0
	},
	createdAt: { 
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
      req.user = user
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}

//Middlewares
app.use(cors())
app.use(express.json())

//Routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body

  try {
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true, 
        userId: user._id,
        username: user.username,
        email: user.email,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = new User({
      username,
      email,
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

app.post('/baths', authenticateUser, async (req, res) => {

  try {
    const newBath = new Bath({ 
      user: req.user,
      name: req.body.name, 
      coordinates: req.body.coordinates,
      rating: req.body.rating
    })
    await newBath.save()
    res.json({
      success: true,
      bath: {
        id: newBath._id,
        name: newBath.name,
        coordinates: newBath.coordinates,
        rating: newBath.rating,
        createdAt: newBath.createdAt,
        user: newBath.user._id
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Could not create bath',
      error
    })
  }
})

app.get('/baths', authenticateUser, async (req, res) => {

  if (req.user) {
    const bathList = await Bath.find({ user: mongoose.Types.ObjectId(req.user.id)}).sort({ createdAt: -1 })
    res.json({ success: true, baths: bathList })
  } else {
    res.status(404).json({ error: 'Baths not found' })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})