const userService = require('../service/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')
const fileService = require('../service/fileService')

class UserController {
    async registration (req, res, next) {
        try {
            
            let avatarInfo
            console.log('FORM DATA', req.body)
            console.log('req files ', req.files)
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            
            const { firstName, lastName, nickName, email, password } = req.body
            const userData = await userService.registration( firstName, lastName, nickName, email, password )
            
            if (req.files?.avatar) {
                const { avatar } = req.files
                const avatarPath = await fileService.uploadAvatar(userData.id, avatar)
                avatarInfo = avatarPath
            }

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            
            return res.json({
                ...userData,
                ...avatarInfo
            })
        } catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const { login, password } = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeFirstName (req, res, next) {
        try {
            const { user } = req
            const { firstName } = req.body
            const updatedData = await userService.changeFirstName(user.id, firstName)
            return res.json(updatedData)
        } catch (e) {
            next(e)
        }
    }

    async changeLastName (req, res, next) {
        try {
            const { user } = req
            const { lastName } = req.body
            const updatedData = await userService.changeLastName(user.id, lastName)
            return res.json(updatedData)
        } catch (e) {
            next(e)
        }
    }

    async changeNickName (req, res, next) {
        try {
            const { user } = req
            const { nickName } = req.body
            const updatedData = await userService.changeNickName(user.id, nickName)
            return res.json(updatedData)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()