const Router = require('express')
const groupController = require('../controllers/groupController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/:campaignId', authMiddleware, groupController.getAll)
router.post('/:campaignId', authMiddleware, groupController.create)
router.put('/:id', authMiddleware, groupController.rename)
router.delete('/:id', authMiddleware, groupController.delete)

module.exports = router