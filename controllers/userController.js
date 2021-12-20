const userService = require('../service/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')
const fileService = require('../service/fileService')

class UserController {
    async registration (req, res, next) {
        try {
            let avatarPaths
            console.log(req)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { firstName, lastName, nickName, email, password } = req.body
            const userData = await userService.registration( firstName, lastName, nickName, email, password )
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            
            console.log(userData.user.id)

            if (req.files.avatar) {
               avatarPaths = await fileService.uploadAvatar(userData.user.id, req.files.avatar)
            }
            
            console.log(avatarPaths)

            return res.json({
                ...userData,
                ...avatarPaths
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

}

module.exports = new UserController()