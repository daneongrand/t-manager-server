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

}

module.exports = new UserService()