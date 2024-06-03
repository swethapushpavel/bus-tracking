const express = require('express');
const path = require('path'); 
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://localhost:27017/bus_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Set views directory to the main directory
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login'); // Render the login page
});

app.get('/register', (req, res) => {
  res.render('register'); // Render the register page
});

app.post('/register', async (req, res) => {
    const { username, email, password, phoneNumber, busNumber, busRoute } = req.body;
    const user = new User({ username, email, password, phoneNumber, busNumber, busRoute }); // Include busNumber and busRoute
    await user.save();
    res.redirect('/login');
  });
  

app.get('/login', (req, res) => {
  res.render('login'); // Render the login page
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    res.redirect('/login');
  } else {
    req.session.user = user;
    res.redirect('/index.html'); // Redirect to index.html after successful login
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Serve index.html directly from the 'public' directory
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Serve erode.html for /erode route
app.get('/erode', (req, res) => {
  res.sendFile(path.join(__dirname,'/public' ,'erode.html'));
});

app.listen(2000, () => {
  console.log('Server is running on http://localhost:2000');
});
