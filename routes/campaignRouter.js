const Router = require('express')
const router = new Router()
const campaignController = require('../controllers/campaignController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, campaignController.getAll)
router.post('/', authMiddleware, campaignController.create)


module.exports = router