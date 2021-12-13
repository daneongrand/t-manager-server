const { MinusPhrase } = require("../models/models")

class minusPhraseService {
    
    async getAll(campaignId) {
        const minusPhrases = await MinusPhrase.findAll({ where: {campaignId} })
        return minusPhrases
    }

    async create(campaignId, keyword, ams, competition, lowRange, highRange, currency) {
        const minusPhrase = await MinusPhrase.create({ campaignId, keyword, ams, competition, lowRange, highRange, currency })
        return minusPhrase
    }

    async delete(keywordId) {
        const deletedMinusPhrases = await MinusPhrase.destroy({ where: {keywordId} })
        return deletedMinusPhrases
    }

}

module.exports = new minusPhraseService()