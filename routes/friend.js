const express = require('express');
const { verify } = require('../middlewares/util');

const {Sequelize: { Op }} = require('../models');
const User = require('../models').User;
const Friend = require('../models').Friend;
const Request = require('../models').Request;

const router = express.Router();

// 친구 목록 API
router.get('/', async (req, res, next)=>{
    let token = req.get("token");
    if(token) {
        try {
            let auth = await verify(token, 'jwt');
            if(auth) {
                console.log(auth);
                user = await User.find({where: {id: auth}});
                exist = await user.getFriends();
                res.json(exist);
            }
        } catch (err) {
            next(err);
        }
    }
});

// 친구 찾기 API (친구 안되어있는 사람만 검색됨)
router.get('/search/:username', async (req, res, next)=>{
    let token = req.get("token");
    if(token) {
        try {
            let auth = await verify(token, 'jwt');
            if(auth) {
                console.log(auth);
                user = await User.find({where: {id: auth}});
                exist = await user.getFriends();
                let arr = [];
                for(let i=0; i<exist.length; i++)
                    arr.push(exist[i].targetId);
                console.log(arr);
                let result = await User.findAll({
                    where: {
                        username: req.params.username,
                        id: {[Op.notIn] : arr},
                    },
                });
                res.json(result);
            }
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;