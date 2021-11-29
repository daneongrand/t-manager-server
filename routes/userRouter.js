const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()

router.post('/signup', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router