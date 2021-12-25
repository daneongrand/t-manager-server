const Router = require('express')
const historyPostController = require('../controllers/historyPostController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/', authMiddleware, historyPostController.getAll)

module.exports = router