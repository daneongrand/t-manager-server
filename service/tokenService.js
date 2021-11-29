const jwt = require('jsonwebtoken')
const { TokenList } = require('../models/models')


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '14d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await TokenList.create({refreshToken, userId})
        return token
    }

} 

module.exports = new TokenService()