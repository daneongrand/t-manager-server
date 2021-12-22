const { HistoryPost } = require("../models/models")

class HistoryPostService {

    async createCampaignPost(campaignName, userId) {
        const post = `Кампания "${campaignName}" создана`
        const newpost = await HistoryPost.create({
            post,
            userId
        })
        return newpost
    }

    async renameCampaignPost(campaignName, newCampaignName, userId) {
        const post = `Имя кампании "${campaignName}" изменено на "${newCampaignName}"`
        const newpost = await HistoryPost.create({ 
            post,
            userId
        })
        return newpost
    }

    async deleteCampaignPost(campaignName, userId) {
        const post = `Кампания "${campaignName}" удалена`
        const newpost = await HistoryPost.create({
            post,
            userId
        })
        return newpost
    }

    async createGroupPost(id, campaignId, groupId, userId) {

    }

    async deleteGroupPost(id, campaignId, groupId, userId) {

    }

}

module.exports = new HistoryPostService()