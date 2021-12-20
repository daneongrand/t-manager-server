const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nickName: {
        type: DataTypes.STRING,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        unique: true
    },

    password: {
        type: DataTypes.STRING
    },

    firstName: {
        type: DataTypes.STRING
    },

    lastName: {
        type: DataTypes.STRING
    },
    
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    avatarSmall: {
        type: DataTypes.STRING
    },

    avatarOriginal: {
        type: DataTypes.STRING
    }

})

const Campaign = sequelize.define('campaign', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    campaignName: {
        type: DataTypes.STRING
    }

})

const Group = sequelize.define('group', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    groupName: {
        type: DataTypes.STRING
    }

})

const Keyword = sequelize.define('keyword', {

    keywordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    keyword: {
        type: DataTypes.STRING
    },

    ams: {
        type: DataTypes.STRING
    },

    competition: {
        type: DataTypes.STRING
    },

    lowRange: {
        type: DataTypes.STRING
        
    },

    highRange: {
        type: DataTypes.STRING
    },

    currency: {
        type: DataTypes.STRING
    },

    isMinusPhrase: {
        type: DataTypes.BOOLEAN
    }

})



const TokenList = sequelize.define('tokenList', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    refreshToken: {
        type: DataTypes.STRING,
    }

})


User.hasMany(Campaign)
User.hasMany(TokenList)
Campaign.hasMany(Group)
Campaign.hasMany(Keyword)
Group.hasMany(Keyword)


module.exports = {
    User,
    Campaign,
    Group,
    Keyword,
    TokenList
}