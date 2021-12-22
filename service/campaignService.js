const { Campaign } = require('../models/models')
const historyPostService = require('./historyPostService')

class CampaignService {
    async getAll (userId) {
        const campaigns = await Campaign.findAll({ where: {userId: userId} })
        return {
            campaigns
        }
    }

    async create (campaignName, userId) {
        const campaign = await Campaign.create({campaignName, userId})
        const post = await historyPostService.createCampaignPost(campaignName, userId)
        return {
            campaign,
            post
        }
    }

    async rename (campaignId, campaignName, id) {
        const campaign = await Campaign.findOne({ where: { id: campaignId } })
        const post = await historyPostService.renameCampaignPost(campaign.campaignName, campaignName, id)
        
        await Campaign.update(
            {
                campaignName: campaignName
            },
            {
                where: { id: campaignId }
            }
        )
        return {
            campaignName,
            post
        }
    }

    async getOne (campaignId) {
        const campaign = await Campaign.findOne({ where: { id: campaignId } })
        return {
            campaign
        }

    }

    async delete (campaignId, id) {
        
        const campaign = await Campaign.findOne({ where: { id: campaignId } })
        
        const post = await historyPostService.deleteCampaignPost(campaign.campaignName, id)

        await Campaign.destroy({ where: { id: campaignId } })
        return {
            campaignId,
            post
        }
    }
}

module.exports = new CampaignService()