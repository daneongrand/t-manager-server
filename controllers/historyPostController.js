const historyPostService = require("../service/historyPostService")

class historyPostController {
    async getAll(req, res, next) {
        try {
            const { limit, page } = req.query
            const { user } = req
            const posts = await historyPostService.getAll(user.id, limit, page)
            return res.json(posts)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new historyPostController()