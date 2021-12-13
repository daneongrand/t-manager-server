const Router = require('express')
const keywordController = require('../controllers/keywordController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/:campaignId&:groupId', authMiddleware, keywordController.getAll)
router.post('/:campaignId&:groupId', authMiddleware, keywordController.create)
router.delete('/:keywordId', authMiddleware, keywordController.delete)

module.exports = router