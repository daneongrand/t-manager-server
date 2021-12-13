const keywordsService = require("../service/keywordsService")

class KeywordController {
    async create(req, res, next) {
        try {
            const { campaignId, groupId } = req.params
            console.log(campaignId, groupId)
            const { keyword, ams, competition, lowRange, highRange, currency } = req.body
            const newKeyword = await keywordsService.create(campaignId, groupId, keyword, ams, competition, lowRange, highRange, currency)
            res.json(newKeyword)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const { campaignId, groupId } = req.params
            const keywords = await keywordsService.getAll(campaignId, groupId)
            res.json(keywords)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { keywordId } = req.params
            const deletedKeyword = await keywordsService.delete(keywordId)
            res.json(deletedKeyword)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new KeywordController()