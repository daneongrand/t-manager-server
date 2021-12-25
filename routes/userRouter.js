const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const { body } = require('express-validator')
const multer = require('multer')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = multer({})

router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.put('/changeFirstName', authMiddleware, userController.changeFirstName)
router.put('/changeLastName', authMiddleware, userController.changeLastName)
router.put('/changeNickName', authMiddleware, userController.changeNickName)

module.exports = router