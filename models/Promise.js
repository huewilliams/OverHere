module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Promise', {
        id : {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        place : {
            type: DataTypes.STRING(30),
        },
        time : {
            type: DataTypes.DATE,
        },
    },{
        timestamps : false,
    })
};