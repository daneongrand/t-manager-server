const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError')

class UserService {
    async registration (firstName, lastName, nickName, email, password) {

        console.log(firstName, lastName, nickName, email, password)

        const candidate_email = await User.findOne({ where: {email: email} })
        const candidate_nickName = await User.findOne({ where: {nickName: nickName} })

        if (candidate_email || candidate_nickName) {
            throw ApiError.BadRequest(`Пользователь с таким email или nickname уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        console.log(hashPassword)
        const user = await User.create({firstName, lastName, nickName, email, password: hashPassword})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login (login, password) {
        let user = await User.findOne({ where: {email: login} })

        if (!user) {
            user = await User.findOne({ where: {nickName: login} })
        }

        if (!user) {
            throw ApiError.BadRequest('Пользователь с такими данными не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Пароль введен неверно')
        }

        const userDto = new UserDto(user)
        const avatarPath = {
            avatarOriginalName: user.avatarOriginal,
            avatarSmallName: user.avatarSmall
        }
        const tokens = tokenService.generateTokens({ ...userDto })
        tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...avatarPath, 
            ...tokens,
            user: userDto
        }
    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        await tokenService.removeToken(refreshToken)

        const user = await User.findOne({ where: { id: userData.id } })

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...tokens,
            user: userDto
        }
    }

}

module.exports = new UserService()