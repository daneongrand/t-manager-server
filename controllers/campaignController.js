const campaignService = require('../service/campaignService')
const historyPostService = require('../service/historyPostService')

class CampaignController {
    async getAll (req, res, next) {
        try {
            const { user } = req
            const campaigns = await campaignService.getAll(user.id)
            return res.json(campaigns)
        } catch (e) {
            next(e)
        }
    }

    async create (req, res, next) {
        try {
            const { user } = req
            const { campaignName } = req.body
            const campaign = await campaignService.create(campaignName, user.id)
            return res.json(campaign)
        } catch (e) {
            next(e)
        }
    }


    async rename (req, res, next) {
        try {
            const { id } = req.params
            const { campaignName } = req.body
            const { user } = req
            const newCampaignName = await campaignService.rename(id, campaignName, user.id)
            return res.json(newCampaignName)
        } catch (e) {
            next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const { id } = req.params
            const campaign = await campaignService.getOne(id)
            return res.json(campaign)
        } catch (e) {
            next(e)
        }
    }

    async delete (req, res, next) {
        try {
            const { user } = req
            const { id } = req.params
            const campaign = await campaignService.delete(id, user.id)
            console.log("CAMPAIGN", campaign)
            return res.json(campaign)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new CampaignController()