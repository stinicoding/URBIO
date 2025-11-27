const router = require('express').Router()
     const controller = require('../controllers/postsController')

     router.post('/newpost',controller.savePost)
     router.post('/getposts', controller.displayPosts)
     router.post('/newcomment', controller.saveComment)

     module.exports = router