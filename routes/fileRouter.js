const Router = require('express')
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.post('/uploadFile/:campaignId', authMiddleware, fileController.fileUpload)
router.put('/updateAvatar', authMiddleware, fileController.updateAvatar)
router.delete('/deleteAvatar', authMiddleware, fileController.deleteAvatar)

module.exports = router