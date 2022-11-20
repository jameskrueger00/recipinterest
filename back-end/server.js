const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('./passport');
const MongoStore = require('connect-mongo')
const session = require('express-session')
// Route requires
const user = require('./routes/user')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
const clientP = mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(m=> m.connection.getClient())

// MIDDLEWARE
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

app.use(session({
  secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: clientP,
    dbName: "test",
    stringify: false,
    autoRemove: 'interval',
    autoRemoveInterval: 1
  })
}));

const recipieSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: String,
  instructions: String,
  prepTime: String,
  author: String,
  color: String
});

// create a virtual paramter that turns the default _id field into id
recipieSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
recipieSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Recipie = mongoose.model('Recipie', recipieSchema);

app.get('/api/recipies', async (req, res) => {
  try {
    let recipies = await Recipie.find();
    res.send({
      recipies: recipies
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/recipies', async (req, res) => {
  const recipie = new Recipie({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    prepTime: req.body.prepTime,
    author:req.body.author,
    color: req.body.color
  });
  try {
    await recipie.save();
    res.send({
      recipie: recipie
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipies/:id', async (req, res) => {
  try {
    await Recipie.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use('/user', user)

app.listen(3002, () => console.log('Server listening on port 3002!'));
