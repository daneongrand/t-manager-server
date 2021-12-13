const { Keyword } = require("../models/models")

class KeywordsService {

    async getAll( campaignId, groupId ) {
        if (groupId === 'null') {
            const keywords = await Keyword.findAll({ where: { campaignId, groupId: null } })
            return keywords
        } else {
            const keywords = await Keyword.findAll({ where: { campaignId, groupId } })
            return keywords
        }
    }

    async create(campaignId, groupId, keyword, ams, competition, lowRange, highRange, currency) {
        if (groupId === 'null') {
            const newKeyword = await Keyword.create({ campaignId, keyword, ams, competition, lowRange, highRange, currency })
            return newKeyword
        } else {
            const newKeyword = await Keyword.create({ campaignId, groupId, keyword, ams, competition, lowRange, highRange, currency })
            return newKeyword
        }
    }

    async delete(keywordId) {
        const deletedKeyword = await Keyword.destroy({ where: { keywordId } })
        return deletedKeyword
    }

}

module.exports = new KeywordsService()