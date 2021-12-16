const fileService = require('../service/fileService')

class fileController {
    async fileUpload (req, res, next) {
        try {
            const { user } = req
            const { campaignId } = req.params
            const file = req.files.file
            const keywords = await fileService.fileUpload(user.id, campaignId, file)
            console.log(keywords)
            return res.json(keywords)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new fileController()