module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Friend', {
        targetId: {
            type: DataTypes.STRING(20),
        },
    },{
        timestamps: false,
    })
};