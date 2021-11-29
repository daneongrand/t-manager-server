const { Campaign } = require('../models/models')

class CampaignService {
    async getAll (userId) {
        const campaigns = await Campaign.findAll({ where: {userId: userId} })
        return {
            campaigns
        }
    }

    async create (campaignName, userId) {
        const campaign = await Campaign.create({campaignName, userId})
        return {
            campaign
        }
    }
}

module.exports = new CampaignService()