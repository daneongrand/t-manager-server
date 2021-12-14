const { Keyword } = require("../models/models")

class KeywordsService {

    async getAllKeyword( campaignId, groupId ) {
        if (groupId === 'null') {
            const keywords = await Keyword.findAll({ where: { campaignId, groupId: null, isMinusPhrase: false } })
            return keywords
        } else {
            const keywords = await Keyword.findAll({ where: { campaignId, groupId } })
            return keywords
        }
    }

    async getAllMinusPhrase( campaignId ) {
        const minusPhrases = await Keyword.findAll({ where: { campaignId, isMinusPhrase: true } })
        return minusPhrases
    }

    async createKeyword( campaignId, groupId, keyword, ams, competition, lowRange, highRange, currency ) {
        if (groupId === 'null') {
            const newKeyword = await Keyword.create({ campaignId, keyword, ams, competition, lowRange, highRange, currency, isMinusPhrase: false })
            return newKeyword
        } else {
            const newKeyword = await Keyword.create({ campaignId, groupId, keyword, ams, competition, lowRange, highRange, currency, isMinusPhrase: false })
            return newKeyword
        }
    }

    async createMinusPhrase( campaignId, keyword, ams, competition, lowRange, highRange, currency ) {
        const newMinusPhrase = await Keyword.create({ campaignId, keyword, ams, competition, lowRange, highRange, currency, isMinusPhrase: true })
        return newMinusPhrase
    }

    async deleteKeyword( keywordId ) {
        const deletedKeyword = await Keyword.destroy({ where: { keywordId } })
        return deletedKeyword
    }

    async deleteMinusPhrase( keywordId ) {
        const deletedMinusPhrase = await Keyword.destroy({ where: { keywordId } })
        return deletedMinusPhrase
    }

}

module.exports = new KeywordsService()