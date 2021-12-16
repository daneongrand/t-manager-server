const path = require('path') 
const fs = require('fs/promises')
const csv = require('csv-parser')
const { v4 } = require('uuid')
const keywordsService = require('./keywordsService')

class fileService {
    async fileUpload(id, campaignId, file) {
        const pathDirsFiles = path.join(__dirname, '..', 'files')
        await fs.mkdir(path.join(pathDirsFiles, `id_${id}`))
        const pathUploadFile = path.join(pathDirsFiles, `id_${id}`, file.name)
        await file.mv(pathUploadFile)
        const results = await this.readFile(pathUploadFile)
        // const keywords = results.map((item) => {
        //     return {
        //         keywordId: v4(),
        //         keyword: item["Keyword"],
        //         currency: item["Currency"],
        //         ams: item["Avg. monthly searches"],
        //         competition: item["Competition"],
        //         lowRange: item["Top of page bid (low range)"],
        //         highRange: item["Top of page bid (high range)"]
        //     }
        // })
        const keywords = Promise.all(results.map(async (item) => {
            const { dataValues } = await keywordsService.createKeyword(
                campaignId,
                'null',
                item["Keyword"],
                item["Avg. monthly searches"],
                item["Competition"],
                item["Top of page bid (low range)"],
                item["Top of page bid (high range)"],
                item["Currency"]
            )
            return dataValues
        }))
        const data = await keywords
        await fs.unlink(pathUploadFile)
        await fs.rmdir(path.join(pathDirsFiles, `id_${id}`))
        return data
    }

    async readFile(pathUploadFile) {
        const fd = await fs.open(pathUploadFile)
        return new Promise((resolve, reject) => {
            const results = []
            fd.createReadStream({ encoding: 'utf16le' })
                .pipe(csv({separator: '\t', skipLines: 2}))
                .on('data', data => results.push(data))
                .on('end', () => {
                    resolve(results)
                })
        })
    }
}

module.exports = new fileService()