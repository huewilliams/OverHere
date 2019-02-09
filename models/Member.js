module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Member', {
        userId: {
            type: DataTypes.STRING(20)
        }
    }, {
        timestamps: false,
    })
};