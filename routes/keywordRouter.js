const Router = require('express')
const keywordController = require('../controllers/keywordController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/:campaignId&:groupId', authMiddleware, keywordController.getAllKeyword)
router.get('/minusPhrase/:campaignId', authMiddleware, keywordController.getAllMinusPhrase)
router.post('/:campaignId&:groupId', authMiddleware, keywordController.createKeyword)
router.post('/minusPhrase/:campaignId', authMiddleware, keywordController.createMinusPhrase)
router.delete('/:keywordId', authMiddleware, keywordController.deleteKeyword)
router.delete('/minusPhrase/:keywordId', authMiddleware, keywordController.deleteMinusPhrase)


module.exports = router