module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Request', {
        sender: {
            type: DataTypes.STRING(20),
        }
    }, {
        timestamps: false,
    })
};