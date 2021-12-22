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

    async uploadAvatar(req, res, next) {
        try {
            const { user } = req
            const avatar = req.files.avatar
            console.log(avatar)
            const paths = await fileService.uploadAvatar(user.id, avatar)
            return res.json(paths)
        } catch(e) {
            next(e)
        }
    }

    async updateAvatar(req, res, next) {
        try {
            const { user } = req
            const file = req.files.avatar
            const newPaths = await fileService.updateAvatar(user.id, file)
            return res.json(newPaths)
        } catch (e) {
            next(e)
        }
    }

    async deleteAvatar(req, res, next) {
        try {
            const { user } = req
            const message = await fileService.deleteAvatar(user.id)
            res.json(message)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new fileController()