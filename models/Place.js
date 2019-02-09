module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Place', {
        name: {
            type: DataTypes.STRING(20),
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        locate: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: false,
    })
};