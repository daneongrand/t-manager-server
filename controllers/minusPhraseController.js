const minusPhraseService = require("../service/minusPhraseService")

class MinusPhraseController {

    async create(req, res, next) {
        try {
            const { campaignId } = req.params
            const { keyword, ams, competition, lowRange, highRange, currency } = req.body
            const minusPhrase = await minusPhraseService.create(campaignId, keyword, ams, competition, lowRange, highRange, currency)
            res.json(minusPhrase)
        } catch(e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const { campaignId } = req.params
            const minusPhrases = await minusPhraseService.getAll(campaignId)
            res.json(minusPhrases)
        } catch(e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { keywordId } = req.params
            const deletedMinusPhrase = await minusPhraseService.delete(keywordId)
            res.json(deletedMinusPhrase)
        } catch(e) {
            next(e)
        }
    }

}

module.exports = new MinusPhraseController()