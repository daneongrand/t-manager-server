const Router = require('express')
const minusPhraseController = require('../controllers/minusPhraseController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/:campaignId', authMiddleware, minusPhraseController.getAll)
router.post('/:campaignId', authMiddleware, minusPhraseController.create)
router.delete('/:keywordId', authMiddleware, minusPhraseController.delete)


module.exports = router