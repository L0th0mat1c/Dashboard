var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3030'
const api = apiAdapter(BASE_URL)

router.get('/local/test', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})

router.post('/local/login', (req, res) => {
    console.log('local login')
    api.post(req.path).then(resp => {
        res.send(resp.data)
      })
})

router.post('/local/adduser', (req, res) => {
    console.log('local login')
    api.post(req.path).then(resp => {
        res.send(resp.data)
      })
})

router.post('/local/auth', (req, res) => {
    console.log('local login')
    api.post(req.path).then(resp => {
        res.send(resp.data)
      })
})

module.exports = router