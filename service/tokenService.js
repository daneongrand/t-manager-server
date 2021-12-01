const jwt = require('jsonwebtoken')
const { TokenList } = require('../models/models')


class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '14d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken (userId, refreshToken) {
        const token = await TokenList.create({refreshToken, userId})
        return token
    }

    async removeToken (refreshToken) {
        const tokenData = await TokenList.destroy({ where: {refreshToken: refreshToken} })
        return tokenData
    }

    async findToken (refreshToken) {
        const tokenData = await TokenList.findOne({ where: {refreshToken: refreshToken} })
        return tokenData
    }

} 

module.exports = new TokenService()