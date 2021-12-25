const { HistoryPost, Group } = require("../models/models")

class HistoryPostService {

    async getAll(userId, limit = 10, page = 1) {
        const offset = page * limit - limit 
        const postList = await HistoryPost.findAndCountAll({
            where: { userId },
            limit,
            offset,
            order: [
                [ 'createdAt', 'DESC' ]
            ]
        })
        return postList
    }

    async createCampaignPost(campaignName, userId) {
        const post = `Кампания "${campaignName}" создана`
        const newPost = await HistoryPost.create({
            post,
            userId
        })
        return newPost
    }

    async renameCampaignPost(campaignName, newCampaignName, userId) {
        const post = `Имя кампании "${campaignName}" изменено на "${newCampaignName}"`
        const newPost = await HistoryPost.create({ 
            post,
            userId
        })
        return newPost
    }

    async deleteCampaignPost(campaignName, userId) {
        const post = `Кампания "${campaignName}" удалена`
        const newPost = await HistoryPost.create({
            post,
            userId
        })
        return newPost
    }

    async createGroupPost(campaignName, groupName, userId) {
        const post = `Группа "${groupName}" создана в кампании "${campaignName}"`
        const newPost = await HistoryPost.create({
            post,
            userId
        })
        return newPost
    }

    async renameGroupPost(campaignName, groupName, newGroupName, userId) {
        const post = `Имя группы "${groupName}" изменено на "${newGroupName}" в кампании "${campaignName}"`
        const newPost = await HistoryPost.create({
            post,
            userId
        })
        return newPost
    }


    async deleteGroupPost(campaignName, groupName, userId) {
        const post = `Группа "${groupName}" удалена из кампании "${campaignName}"`
        const newPost = await HistoryPost.create({
            post,
            userId
        })
        return newPost
    }

}

module.exports = new HistoryPostService()