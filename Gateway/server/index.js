var express = require('express');
var app = express();
var router = require('./routers/router');
var bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
// var flash=require("connect-flash");

const session = require('express-session');
const port = 3000;
var cors = require('cors');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var http = require('http');

app.use(cookieSession({
    name: 'gateway',
    keys: ['dashboardgateway'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));

app.use(cors({
    origin: [
    'http://localhost:8080',
    'https://localhost:8080'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

app.use(cookieParser());

function getcookie(req) {
    var cookie = req.headers.cookie;
    // user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
    return cookie.split('; ');
}
app.use(router)

app.get('/', (req, res) => {
    res.send("Dashboard API Gateway")
})

app.get('/logout', (req, res) => {
    console.log('session en cours', req.cookies)
    var cookie = getcookie(req);
    var index = cookie[0].indexOf("mysession");
    
    console.log('session en cours', cookie)
    if(index !== -1){
        console.log('mysession done !!', index)
    }
})

app.get('/auth', (req, res) => {
    console.log('session en cours', req.cookies)
    var cookie = getcookie(req);
    var index = cookie[0].indexOf("mysession");
    if(index !== -1){
        app.get('/local/auth', (req, res) => {
            console.log('ok pour facebook auth')
        })
    }else{
        router.localService
    }
})


console.log("Dashboard API Gateway run on localhost:3000")

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`)
  })