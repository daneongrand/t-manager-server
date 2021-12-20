const path = require('path') 
const fs = require('fs/promises')
const csv = require('csv-parser')
const Jimp = require('jimp')
const { v4 } = require('uuid')
const keywordsService = require('./keywordsService')
const { User } = require('../models/models')

class fileService {
    async fileUpload(id, campaignId, file) {
        const pathDirsFiles = path.join(__dirname, '..', 'files')
        await fs.mkdir(path.join(pathDirsFiles, `id_${id}`))
        const pathUploadFile = path.join(pathDirsFiles, `id_${id}`, file.name)
        await file.mv(pathUploadFile)
        const results = await this.readFile(pathUploadFile)
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

    async uploadAvatar(id, file) {
        console.log("FILE!!!!!!!!!!!!", file)
        const extAvatar = file.name.split('.')[1]
        const avatarName = v4() + `.${extAvatar}`
        const pathDirsAvatars = path.join(__dirname, '..', 'static')
        await file.mv(path.join(pathDirsAvatars, avatarName))
        const avatarOriginalName = v4() + `.${extAvatar}`
        const avatarSmallName = v4() + `.${extAvatar}`

        // Create original avatar 200x200
        Jimp.read(path.join(pathDirsAvatars, avatarName))
            .then(newImg => {
                const user = User.update({
                    avatarOriginal: avatarOriginalName
                },{
                    where: { id }
                })
                return newImg.cover(200, 200).quality(60).write(path.join(pathDirsAvatars, avatarOriginalName))
            })
            .catch(err => console.log(err))

        // Create small avatar 24x24
        Jimp.read(path.join(pathDirsAvatars, avatarName))
            .then(newImg => {
                User.update({
                    avatarSmall: avatarSmallName
                },{
                    where: { id }
                })
                return newImg.cover(24, 24).quality(60).write(path.join(pathDirsAvatars, avatarSmallName))
            })
            .catch(err => console.log(err))

        await fs.unlink(path.join(pathDirsAvatars, avatarName))
        


        return {
            avatarOriginalName,
            avatarSmallName
        }
    }

    async updateAvatar(id, file) {
        await this.deleteAvatar(id)
        const newPaths = await this.uploadAvatar(id, file)
        return {
            ...newPaths
        }
    }

    async deleteAvatar(id) {
        const pathDirsAvatars = path.join(__dirname, '..', 'static')
        const user = await User.findOne({ where: {id} })
        console.log(user)
        console.log(user.avatarOriginal)
        if (user.avatarSmall) {
            const pathSmallAvatar = user.avatarSmall
            await fs.unlink(path.join(pathDirsAvatars, pathSmallAvatar))

        }

        if (user.avatarOriginal) {
            const pathOriginalAvatar = user.avatarOriginal
            await fs.unlink(path.join(pathDirsAvatars, pathOriginalAvatar))
        }

        await User.update({
            avatarOriginal: null,
            avatarSmall: null
        },{
            where: { id }
        })

        return {
            message: 'Avatar has been deleted'
        }
    }

}

module.exports = new fileService()