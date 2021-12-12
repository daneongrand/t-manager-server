const keywordsService = require("../service/keywordsService")

class KeywordController {
    async create(req, res, next) {
        try {
            const { groupId } = req.params
            const { keyword, ams, competition, lowRange, highRange, currency } = req.body
            const newKeyword = await keywordsService.create(groupId, keyword, ams, competition, lowRange, highRange, currency)
            res.json(newKeyword)
        } catch (e) {

        }
    }

    async getAll(req, res, next) {
        try {
            const { groupId } = req.params
            const keywords = await keywordsService.getAll(groupId)
            res.json(keywords)
        } catch (e) {
            
        }
    }

    async delete(req, res, next) {
        try {

        } catch (e) {
            
        }
    }
}

module.exports = new KeywordController()