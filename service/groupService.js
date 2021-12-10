const { Group } = require("../models/models")


class GroupService {
    async getAll(campaignId) {
        const groups = await Group.findAll({ where: { campaignId: campaignId }})
        return {
            groups
        }
    }

    async create(campaignId, groupName) {
        const group = await Group.create({groupName, campaignId})
        return {
            group
        }
    }

    async rename(groupId, groupName) {
        const group = await Group.update({
            groupName: groupName
        }, {
            where: { id: groupId }
        })
        return {
            group
        }
    }

    async delete(groupId) {
        const group = await Group.destroy({
            where: { id: groupId }
        })
        return {
            group
        }
    }

}

module.exports = new GroupService()