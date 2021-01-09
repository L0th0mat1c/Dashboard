var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=bf406f7429474c34aca1ab45700b2877'
const api = apiAdapter(BASE_URL)
const apiKey = 'bf406f7429474c34aca1ab45700b2877'

router.get('/', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})

router.get('/news', (req, res) => {

    api.get(BASE_URL).then(resp => {
        res.send(resp.data)
      })
})

router.get('/sources', (req, res) => {

  api.get('https://newsapi.org/v2/sources?apiKey='+ apiKey).then(resp => {
      res.send(resp.data)
    })
})

// router.get('/categories/:category', (req, res) => {
//   console.log('req.body', req.params.category)
//   var category = req.params.category
//   api.get('https://newsapi.org/v2/sources?category='+category+'&apiKey='+ apiKey).then(resp => {
//       res.send(resp.data)
//     })
// })

router.get('/news/:category', (req, res) => {
  console.log('reqnews', req.params.category)
  var category = req.params.category
  api.get('https://newsapi.org/v2/top-headlines?country=us&category='+category+'&apiKey='+apiKey).then(resp => {
      res.send(resp.data)
    })
})





module.exports = router