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

    id: {
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
        type: DataTypes.FLOAT
        
    },

    highRange: {
        type: DataTypes.FLOAT
    },

    currency: {
        type: DataTypes.STRING
    }

})

const MinusPhrase = sequelize.define('minusPhrase', {

    id: {
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
        type: DataTypes.FLOAT
        
    },

    highRange: {
        type: DataTypes.FLOAT
    },

    currency: {
        type: DataTypes.STRING
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
Campaign.hasMany(MinusPhrase)
Group.hasMany(Keyword)


module.exports = {
    User,
    Campaign,
    Group,
    Keyword,
    MinusPhrase,
    TokenList
}