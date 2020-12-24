
var Sequelize = require('sequelize');
// 数据库配置文件
var sqlConfig = {
    host: "192.168.0.93",
    user: "root",
    password: "!1Zezhang",
    database: "api"
};

var sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

sequelize.options.logging = false;

module.exports = sequelize;

var companyList = sequelize.define('companyList', {
    id: {
        unique: true,
        autoIncrement: true,
        type: Sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
    },
    companyName: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    },
    proxyPath: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    },
    ajaxJson: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = {
    companyList,
    // softList
};