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

    async rename (campaignId, campaignName) {
        const campaign = await Campaign.update(
            {
                campaignName: campaignName
            },
            {
                where: { id: campaignId }
            }
        )
        return {
            campaign
        }
    }

    async getOne (campaignId) {
        const campaign = await Campaign.findOne({ where: { id: campaignId } })
        return {
            campaign
        }

    }

    async delete (campaignId) {
        const deletedCampaignId = campaignId
        const campaign = await Campaign.destroy({ where: { id: deletedCampaignId } })
        return {
            deletedCampaignId
        }
    }
}

module.exports = new CampaignService()