const { response } = require('express');
var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')



const BASE_URL = 'http://localhost:3050'
const api = apiAdapter(BASE_URL)

router.get('/facebook/test', (req, res) => {
  api.get(req.path).then(resp => {
      res.send(resp.data)
  })
})

router.get('/auth/facebook/secrets', (req, res) => {
    console.log('body', req.body)
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.get('/facebook/auth', (req, res) => {
    api.get(req.path, {
        witnCredentials: true
    }).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router