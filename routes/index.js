const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const campaignRouter = require('./campaignRouter')
const groupRouter = require('./groupRouter')
const keywordRouter = require('./keywordRouter')
const minusPhraseRouter = require('./minusPhraseRouter')

router.use('/user', userRouter)
router.use('/campaign', campaignRouter)
router.use('/group', groupRouter)
router.use('/keyword', keywordRouter)
router.use('/minusPhrase', minusPhraseRouter)

module.exports = router