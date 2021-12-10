const groupService = require("../service/groupService")

class GroupController {
    async getAll(req, res, next) {
        try {
            const { campaignId } = req.params
            const groups = await groupService.getAll(campaignId)
            return res.json(groups)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const { campaignId } = req.params
            const { groupName } = req.body
            const group = await groupService.create(campaignId, groupName)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async rename(req, res, next) {
        try {
            const { id } = req.params
            const { groupName } = req.body
            const group = await groupService.rename(id, groupName)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const group = await groupService.delete(id)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new GroupController()