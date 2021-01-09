const express = require('express')
const port = 3050
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const User = require('./models/User');
const methodOverride = require('method-override');
const axios = require('axios');
// var flash=require("connect-flash");
const cookieSession = require('cookie-session')
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
//-------Login strategies--------------
const FacebookStrategy = require("passport-facebook").Strategy;
const app = express()
// app.use(flash());

var http = require('http');
const Widget = require('./models/Widget');

//
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded())
app.use(session({secret:"thisdashboard"}));
app.use(passport.initialize());
app.use(passport.session({
  secret:"thisdashboard",
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(methodOverride('_method'));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// db
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thomas-loic:M@l0G@1502@facebook.wzffj.mongodb.net/facebook?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


passport.use(new FacebookStrategy({
    clientID: "1028723777539814",
    clientSecret: "8f8f0a7fb10e5277258cb68be7adc2cb",
    callbackURL: "http://localhost:3050/auth/facebook/secrets"
  },
  function(token, refreshToken, profile, done) {
    console.log('profile', profile)
    console.log('token', token)

    User.findOne({ facebookId: profile.id}, function(err, user) {
      if (err) { 
        return done(err); }
      if (!user) {
        console.log('profile', profile)

        user = new User({
          name: profile.displayName,
          facebookId: profile.id,
        });
        user.save(function(err) {
          if (err) console.log(err);
          return done(err, user);
        });
      }else{
        console.log('user', user)
        return done(err, user)
      };
    });
  }
));

function isLogged(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('Is connected !!!', req.user)
    return next()
  }else{
    console.log('Pas pas connected !!!', req.session)

    return next()
  }
 
}

//routes

//----------------Auth by others--------------------------

app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

  app.get('/', isLogged,(req, res) => {
    console.log('req.user', req.user);
    if(req.session.passport.user != null || req.session.passport.user != undefined) {
      userLog = req.session.passport.user
    }else{
      userLog = undefined
    }
    res.redirect('http://localhost:8080/#/');
  });

  app.get('/facebook/auth', isLogged,(req, res) => {
    console.log('req.user', req.session);
    if(req.session.passport != null || req.session.passport != undefined) {
      userLog = req.session.passport.user
    }else{
    userLog = undefined}
    // console.log([user, req.session])
    res.status(200).json({ user: req.user });
  });

  app.get('/auth', isLogged,(req, res) => {
    // console.log('req.user', req.session);
    if(req.session.passport != null || req.session.passport != undefined) {
      userLog = req.session.passport.user
    }else{
    userLog = undefined}
    // console.log([user, req.session])
    res.status(200).json({ user: req.user });
  });

  app.get('/facebook/test', (req, res) => {
    res.status(200).json({message: "Ok , nice !!"})
  })

  app.delete('/logout', (req, res) => {
    console.log('cookie name', req.cookies)
    
    console.log('session name', req.session);
    req.cookies = {};
    // req.session.destroy();
    console.log('session name', req.session);
    req.logOut()
    console.log('cookie name', req.cookies)
    res.redirect('http://localhost:8080/#/login')
  });

//ajout widget dans la table user
app.put('/api/addwidget', (req, res) => {
  User.findOne({ _id: req.body.id })
  .then(user => {
    const test = user.widgets.find(element => element = req.body.widget)
    if(!test){
      user.widgets.push(req.body.widget);
      user.save();
    } else {
      return res.status(401).json({ error: 'Already there' });
    }
  });
});

//liste widgets d'un utilisateur
app.get('/api/getwidgets', (req, res) => {
  User.findOne({ _id: req.body.id })
  .then(user => {

  });
});


//------------------middleware function----------

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


