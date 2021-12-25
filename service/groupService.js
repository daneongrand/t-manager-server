const { Group, Keyword, Campaign } = require("../models/models")
const historyPostService = require("./historyPostService")
const keywordsService = require("./keywordsService")


class GroupService {
    async getAll(campaignId) {
        console.log(campaignId)
        const groups = await Group.findAll({ where: { campaignId: campaignId }})
        const newGroups = Promise.all(groups.map(async (item) => {
            console.log(item)
            const keywords = await keywordsService.getAllKeyword(item.campaignId, item.id)
           
            return {
                groupId: item.id,
                groupName: item.groupName,
                campaignId: item.campaignId,
                groupKeywords: keywords
            }
        }))
        
        return newGroups
    }

    async create(campaignId, groupName, userId) {
        console.log(typeof campaignId,typeof groupName,typeof userId)
        const group = await Group.create({groupName, campaignId})
        const campaign = await Campaign.findOne({ where: { id: campaignId } })
        const post = await historyPostService.createGroupPost(campaign.campaignName, groupName, userId)
        return {
            groupId: group.id,
            groupName: group.groupName,
            campaignId: group.campaignId,
            groupKeywords: [],
            ...post
        }
    }

    async rename(groupId, groupName, userId) {
        const group = await Group.findOne({ where: {id: groupId} })
        const campaign = await Campaign.findOne({ where: {id: group.campaignId} })
        const post = await historyPostService.renameGroupPost(campaign.campaignName, group.groupName, groupName, userId)
        await Group.update({
            groupName: groupName
        }, {
            where: { id: groupId }
        })
        return {
            groupId: groupId,
            groupName: groupName,
            ...post
        }
    }

    async delete(groupId, userId) {
        const group = await Group.findOne({ where: {id: groupId} })
        const campaign = await Campaign.findOne({ where: {id: group.campaignId} })
        const post = await historyPostService.deleteGroupPost(campaign.campaignName, group.groupName, userId)
        await Group.destroy({
            where: { id: groupId }
        })
        return {
            groupId: groupId,
            ...post
        }
    }

}

module.exports = new GroupService()