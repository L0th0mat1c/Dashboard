var express = require('express');

var router = express.Router()
var facebookService = require('./facebookService')
var localService = require('./localService')
var newsService = require('./newsService')
var weatherService = require('./weatherService')
// var bourseService = require('./marketstack')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(facebookService)
router.use(localService)
router.use(newsService)
router.use(weatherService)
// router.use(bourseService)

module.exports = router