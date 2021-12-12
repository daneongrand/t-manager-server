const { Keyword } = require("../models/models")

class KeywordsService {

    async getAll(groupId) {
        const keywords = Keyword.findAll({ where: { groupId: groupId } })
        console.log()
        return keywords
    }

    async create(groupId, keyword, ams, competition, lowRange, highRange, currency) {
        const newKeyword = Keyword.create({ keyword, ams, competition, lowRange, highRange, currency, groupId })
        return newKeyword
    }

    async delete() {

    }

}

module.exports = new KeywordsService()