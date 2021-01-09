const express = require('express')
const port = 3030
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const User = require('./models/User');
const methodOverride = require('method-override');
const axios = require('axios');
const cookieSession = require('cookie-session')
// var flash=require("connect-flash");

const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
//-------Login strategies--------------
// const FacebookStrategy = require("passport-facebook").Strategy;
const app = express()
app.use(express.json()) // Activation du raw (json)
app.use(express.urlencoded({ extended: true })) // Activation de x-wwww-form-urlencoded
// app.use(flash());
var bcrypt = require('bcrypt');
var http = require('http');
const Widget = require('./models/Widget');

//
app.use(cookieSession({
  name: 'local',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded())
// app.use(cookieParser("thisdashboard"));
app.use(session({
  secret:"thisdashboard",
  resave: false,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));


passport.serializeUser(function(user, done) {
  console.log('serialized');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log('Deserialized');
    done(err, user);
  });
});


// db
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Jean-Christophe:cuirmoustache@cluster0.zsxcd.mongodb.net/dashboard?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('YESSSSS!!!!!!')
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


function isLogged(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('Is connected !!!', req.user)
    return next()
  }

  console.log('Pas pas connected !!!', req.user)

  return res.status(200).json({ user: null })
}

//routes

  app.get('/', isLogged,(req, res) => {
    console.log('req.user', req.user);
    userLog = req.session.passport.user
    // console.log([user, req.session])

    res.redirect('http://localhost:8080/#/');
  });

  app.get('/auth', isLogged,(req, res) => {
    console.log('req.user', req.session.passport.user);
    userLog = req.session.passport.user
    // console.log([user, req.session])
    res.status(200).json({ user: req.user });
  });

  app.get('/local/auth', isLogged,(req, res) => {
    console.log('req.user', req.session.passport.user);
    userLog = req.session.passport.user
    // console.log([user, req.session])
    res.status(200).json({ user: req.user });
  });



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

  //ajout utilisateur
  app.post('/local/adduser', (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(401).json({ error: 'Email already taken !' });
      }
      bcrypt.hash(req.body.password, 10)
      // console.log(req.body)
      .then(hash => {
        const userLog = new User({
          ...req.body,
          password: hash
        });
      userLog.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
      });
    });
  });


  //login
  app.post('/local/login', passport.authenticate('local'), (req, res) => {
    console.log('session login', req.session)
    res.status(200).json({user: req.user})
  });
  
  app.get('/local/test', (req, res) => {
    res.status(200).json({message: "Ok , nice  local!!"})
  })

  // affichage utilisateurs
  app.get('/api/getusers', (req, res, next) => {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/test', (req, res) => {
    if(res.isAuthenticated()){
      res.send("You are logged in as"+ req.user.email);
    } else {
      res.send("niet");
    }

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



app.post('/api/twitter', (req, res) => {
  //User.findOne({ _id: req.body.id })

  axios.get('https://api.twitter.com/2/users/by?usernames='+req.body.username, 
    //{'oauth_consumer_key':'O74uw0TDQKNEON2m1qawZ32Ey', 'oauth_signature_method':"HMAC-SHA1", 'oauth_timestamp':secondsSinceEpoch , 'oauth_token': '1057930564135718912-saL2TjLcnMADzxLUw2vrqiZOEaNks2', 'oauth_version':'1.0'},
    {headers : {'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAB5xLAEAAAAA2V5tJnVT2HfoxLb6pDaLetm3k3o%3DJ6RqNP2WvTQGQymTKYwiUY2QiQLMbjWgXNMguS9KLPzksSfqIH'},
    })
    .then(response => { 
      return res.status(200).json({ 
        infos:response.data,
      });
    })
});



app.get('/about.json', (req, res) => {
  let date = Math.round(+new Date()/1000);// unix timestamp
  let data =  {
    "customer":{
         "host": req.ip
    },
    "server":{
        "current_time": date,
        "services":[{
            "name": "prévision météo",
            "widgets":[{
                "name": "prévision météo",
                "description":"Display informations about the weather and temperature for a city",
                "params":[{
                    "name":"city",
                    "type":"string"
                }]
            }]
        
            },{
                
            "name": "twitter",
            "widgets":[{
                "name": "latest tweets",
                "description":"Display the 10 last tweets from a given username",
                "params":[{
                    "name":"username",
                    "type":"string"
                }]},{
                "name": "topics to follow",
                "description":"Display the 10 last tweets about a given keyword",
                "params":[{
                    "name":"topic",
                    "type":"string"
                }]
                
            }]// fin widgets twitter
            }]// fin services
        }
    };
  res.status(200).json(data)
})


