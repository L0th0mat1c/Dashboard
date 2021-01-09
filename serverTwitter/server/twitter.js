const express = require('express')
const port = 3001
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')
//const passport = require('passport')
//const User = require('./models/User');
//const methodOverride = require('method-override');
const axios = require('axios');

//const session = require('express-session');
//const passportLocalMongoose = require('passport-local-mongoose');
//const LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
//-------Login strategies--------------
const app = express()

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

// db
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Jean-Christophe:cuirmoustache@cluster0.zsxcd.mongodb.net/dashboard?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


/// récupérer l'ID twitter
app.post('/api/twitter', (req, res) => {
  axios.get('https://api.twitter.com/2/users/by?usernames='+req.body.username, 
    //{'oauth_consumer_key':'O74uw0TDQKNEON2m1qawZ32Ey', 'oauth_signature_method':"HMAC-SHA1", 'oauth_timestamp':secondsSinceEpoch , 'oauth_token': '1057930564135718912-saL2TjLcnMADzxLUw2vrqiZOEaNks2', 'oauth_version':'1.0'},
    {headers : {'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAB5xLAEAAAAA2V5tJnVT2HfoxLb6pDaLetm3k3o%3DJ6RqNP2WvTQGQymTKYwiUY2QiQLMbjWgXNMguS9KLPzksSfqIH'},
    })
    .then(response => { 
      return res.status(200).json({ 
        infos:response.data,
      });
    }).catch(function () {
      console.log("Promise Rejected");
 });
});


/// récupérer 10 derniers tweets
app.post('/api/tweets', (req, res) => {
  axios.get('https://api.twitter.com/2/users/'+req.body.id+'/tweets?tweet.fields=created_at',
  {headers : {'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAB5xLAEAAAAA2V5tJnVT2HfoxLb6pDaLetm3k3o%3DJ6RqNP2WvTQGQymTKYwiUY2QiQLMbjWgXNMguS9KLPzksSfqIH'},
    })
    .then(response => { 
      res.status(200).json({ 
        infos: response.data
      })
      .catch(error => {
        res.status(400).json({ error })
      });
    })

});

///twitter topic
app.post('/api/topics', (req, res) => {
    axios.get('https://api.twitter.com/2/tweets/search/recent?expansions=author_id&user.fields=username&query='+req.body.topic+'&tweet.fields=created_at', 
    {headers : {'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAB5xLAEAAAAA2V5tJnVT2HfoxLb6pDaLetm3k3o%3DJ6RqNP2WvTQGQymTKYwiUY2QiQLMbjWgXNMguS9KLPzksSfqIH'}})
    .then(response => { 
        //console.log('test',response);
        res.status(200).json({ 
          infos: response.data
        });
      })
      .catch(error => {
        res.status(400).json({ error })
      });

});
