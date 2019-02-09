module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        home: {
            type: DataTypes.STRING(30),
        },
        profileImage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.STRING(10),
        },
    }, {
        timestamps: false
    })
};