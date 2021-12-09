const path = require('path') 
const fs = require('fs/promises')
const csv = require('csv-parser')


class fileService {
    async fileUpload(id, file) {
        const pathDirsFiles = path.join(__dirname, '..', 'files')
        await fs.mkdir(path.join(pathDirsFiles, `id_${id}`))
        const pathUploadFile = path.join(pathDirsFiles, `id_${id}`, file.name)
        await file.mv(pathUploadFile)
        const results = await this.readFile(pathUploadFile)
        const keywords = results.map((item) => {
            return {
                keywords: item["Keyword"],
                currency: item["Currency"],
                ams: item["Avg. monthly searches"],
                competition: item["Competition"],
                lowRange: item["Top of page bid (low range)"],
                highRange: item["Top of page bid (high range)"]
            }
        })
        await fs.unlink(pathUploadFile)
        await fs.rmdir(path.join(pathDirsFiles, `id_${id}`))
        return {
            keywords
        }
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