const { Group, Keyword } = require("../models/models")
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

    async create(campaignId, groupName) {
        const group = await Group.create({groupName, campaignId})
        return {
            groupId: group.id,
            groupName: group.groupName,
            campaignId: group.campaignId,
            groupKeywords: []
        }
    }

    async rename(groupId, groupName) {
        const group = await Group.update({
            groupName: groupName
        }, {
            where: { id: groupId }
        })
        return {
            groupId: groupId,
            groupName: groupName
        }
    }

    async delete(groupId) {
        const group = await Group.destroy({
            where: { id: groupId }
        })
        return {
            groupId: groupId
        }
    }

}

module.exports = new GroupService()