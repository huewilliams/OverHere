const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
    'overhere', //db 이름
    'root', // 이름
    'espada8012!', // 비밀번호
    {
        'host': '127.0.0.1', // 사용할 호스트
        'dialect': 'mysql', // 사용할 DB 종류
        'operatorsAliases': false //deprecated 된 연산자 사용
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Friend = require('./Friend')(sequelize, Sequelize);
db.Request = require('./Request')(sequelize, Sequelize);
db.Promise = require('./Promise')(sequelize, Sequelize);
db.Member = require('./Member')(sequelize, Sequelize);
db.Place = require('./Place')(sequelize, Sequelize);

db.User.belongsToMany(db.Friend, {through: 'UserFriend'});
db.Friend.belongsToMany(db.User, {through: 'UserFriend'});

db.User.hasMany(db.Request, {foreignKey: 'targetId', sourceKey: 'id'});
db.Request.belongsTo(db.User, {foreignKey: 'targetId', targetKey: 'id'});

db.Promise.hasMany(db.Member, {foreignKey: 'promiseId', sourceKey: 'id'});
db.Member.belongsTo(db.Promise, {foreignKey:  'promiseId', targetKey: 'id'});

module.exports = db;