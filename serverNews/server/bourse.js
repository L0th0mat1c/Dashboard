const express = require('express')
const port = 3070
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
// var flash=require("connect-flash");
const axios = require('axios');
axios.create({
    
    withCredentials: true,
    
  });

const session = require('express-session');
var cors = require('cors');
//-------Login strategies--------------
// const FacebookStrategy = require("passport-facebook").Strategy;
const app = express()
app.use(express.json()) // Activation du raw (json)
app.use(express.urlencoded({ extended: true })) // Activation de x-wwww-form-urlencoded
var http = require('http');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    console.log('test news')
    res.status(200).json({news: "nice"})
});

app.get('/news/:category', (req, res) => {
  console.log('reqnews', req.params.category)
  var category = req.params.category
  api.get('https://newsapi.org/v2/top-headlines?country=us&category='+category+'&apiKey='+apiKey).then(resp => {
      res.send(resp.data)
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })

  const BASE_URL = 'http://api.marketstack.com/v1/';

  const apiKey = '38f78506ecdbece66838d89d72c9652e';
  
  
  app.get('/bourses/:category', (req, res) => {
    console.log('req.body', req.params.category)
    var category = req.params.category
    axios.get(BASE_URL+category+'?access_key='+ apiKey+'&symbols=AAPL').then(resp => {
        res.send(resp.data)
      })
  })