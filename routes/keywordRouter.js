const Router = require('express')
const keywordController = require('../controllers/keywordController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/:groupId', authMiddleware, keywordController.getAll)
router.post('/:groupId', authMiddleware, keywordController.create)

module.exports = router