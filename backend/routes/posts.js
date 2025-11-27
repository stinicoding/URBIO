const router = require('express').Router()
     const controller = require('../controllers/postsController')

     router.post('/newpost',controller.savePost)
     router.get('/getposts/:owner', controller.displayPosts)

     module.exports = router