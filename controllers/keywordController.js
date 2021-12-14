const keywordsService = require("../service/keywordsService")

class KeywordController {
    async createKeyword(req, res, next) {
        try {
            const { campaignId, groupId } = req.params
            console.log(campaignId, groupId)
            const { keyword, ams, competition, lowRange, highRange, currency } = req.body
            const newKeyword = await keywordsService.createKeyword(campaignId, groupId, keyword, ams, competition, lowRange, highRange, currency)
            res.json(newKeyword)
        } catch (e) {
            next(e)
        }
    }

    async createMinusPhrase(req, res, next) {
        try {
            const { campaignId } = req.params
            const { keyword, ams, competition, lowRange, highRange, currency } = req.body
            const newKeyword =  await keywordsService.createMinusPhrase(campaignId, keyword, ams, competition, lowRange, highRange, currency)
            res.json(newKeyword)
        } catch (e) {
            next(e)
        }
    }

    async getAllKeyword(req, res, next) {
        try {
            const { campaignId, groupId } = req.params
            const keywords = await keywordsService.getAllKeyword(campaignId, groupId)
            res.json(keywords)
        } catch (e) {
            next(e)
        }
    }

    async getAllMinusPhrase(req, res, next) {
        try {
            const { campaignId } = req.params
            const minusPhrases = await keywordsService.getAllMinusPhrase(campaignId)
            res.json(minusPhrases)
        } catch (e) {
            next(e)
        }
    }

    async deleteKeyword(req, res, next) {
        try {
            const { keywordId } = req.params
            const deletedKeyword = await keywordsService.deleteKeyword(keywordId)
            res.json(deletedKeyword)
        } catch (e) {
            next(e)
        }
    }

    async deleteMinusPhrase(req, res, next) {
        try {
            const { keywordId } = req.params
            const deletedMinusPhrase = await keywordsService.deleteMinusPhrase(keywordId)
            res.json(deletedMinusPhrase)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new KeywordController()