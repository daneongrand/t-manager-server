const userService = require('../service/userService')

class UserController {
    async registration (req, res, next) {
        try {
            const { firstName, lastName, nickName, email, password } = req.body
            const userData = await userService.registration( firstName, lastName, nickName, email, password )
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()