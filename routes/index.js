const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const campaignRouter = require('./campaignRouter')
const groupRouter = require('./groupRouter')
const keywordRouter = require('./keywordRouter')
const fileRouter = require('./fileRouter')
const historyPostRouter = require('./historyPostRouter')

router.use('/user', userRouter)
router.use('/campaign', campaignRouter)
router.use('/group', groupRouter)
router.use('/keyword', keywordRouter)
router.use('/files', fileRouter)
router.use('/historyPost', historyPostRouter)

module.exports = router