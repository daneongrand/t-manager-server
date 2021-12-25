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
        let errorArray = []
    
        if (candidate_email) {
            errorArray.push({ errCode: 1, errName: 'Пользователь с таким email уже существует' })
        }

        if (candidate_nickName) {
            errorArray.push({ errCode: 2, errName: 'Пользователь с таким nickName уже существует' })
        }

        if (candidate_email || candidate_nickName) {
            throw ApiError.BadRequest(`Пользователь с такимими данными уже существует`, errorArray)
        }
        
        const hashPassword = await bcrypt.hash(password, 3)
        console.log(hashPassword)
        const user = await User.create({firstName, lastName, nickName, email, password: hashPassword})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            ...userDto
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
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            ...userDto
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

        const avatarPath = {
            avatarOriginalName: user.avatarOriginal,
            avatarSmallName: user.avatarSmall
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...avatarPath,
            ...tokens,
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            ...userDto
        }
    }

    async changeFirstName (userId, newFirstName) {
        await User.update({
            firstName: newFirstName
        }, {
            where: { id: userId }
        })
        return newFirstName
    }

    async changeLastName (userId, newLastName) {
        await User.update({
            lastName: newLastName
        }, {
            where: { id: userId }
        })
        return newLastName
    }

    async changeNickName (userId, newNickName) {
        console.log('123123123131      ',userId, newNickName)
        const candidate = await User.findOne({ where: { nickName: newNickName } })
        if (candidate) {
            console.log(candidate, 'true')
            throw ApiError.BadRequest(`Пользователь с такимими данными уже существует`, { errCode: 2, errName: 'Пользователь с таким nickName уже существует' })
        } else {
            console.log(candidate, 'false')
            await User.update({
                nickName: newNickName
            }, {
                where: { id: userId }
            })
            return newNickName 
        }
    }

}

module.exports = new UserService()