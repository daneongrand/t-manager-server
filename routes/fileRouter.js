const Router = require('express')
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.post('/uploadFile/:campaignId', authMiddleware, fileController.fileUpload)

module.exports = router