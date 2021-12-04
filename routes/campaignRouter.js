const Router = require('express')
const router = new Router()
const campaignController = require('../controllers/campaignController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, campaignController.getAll)
router.post('/', authMiddleware, campaignController.create)
router.get('/:id', authMiddleware, campaignController.getOne)
router.put('/:id', authMiddleware, campaignController.rename)
router.delete('/:id', authMiddleware, campaignController.delete)


module.exports = router