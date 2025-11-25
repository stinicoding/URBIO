const router = require('express').Router()
     const controller = require('../controllers/usersController')

     router.post('/register',controller.registerUser)

     module.exports = router