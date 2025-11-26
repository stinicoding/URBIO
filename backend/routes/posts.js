const router = require('express').Router()
     const controller = require('../controllers/postsController')

     router.post('/newpost',controller.savePost)

     module.exports = router