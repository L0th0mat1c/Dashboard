var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'https://prevision-meteo.ch/services/json/'
const api = apiAdapter(BASE_URL)

router.get('/', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})

router.get('/weather', (req, res) => {

    api.get(BASE_URL+'toulouse').then(resp => {
        res.send(resp.data)
      })
})



module.exports = router