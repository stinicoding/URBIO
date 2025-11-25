const router = require('express').Router()
     const controller = require('../controllers/usersController')

     router.post('/register',controller.registerUser)
     router.post('/login', controller.loginUser)
     router.post('/token', controller.verifyToken)

     module.exports = router