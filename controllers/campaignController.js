const campaignService = require('../service/campaignService')

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

}

module.exports = new CampaignController()