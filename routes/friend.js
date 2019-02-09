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

// 친구 요청 API
router.post('/request', async (req, res, next)=>{
    let token = req.get("token");
    if(token) {
        try {
            let auth = await verify(token, 'jwt');
            if(auth) {
                let target = await Request.findOne({
                    where: {sender: auth, targetId: req.body.targetId}
                });
                if(target) {
                    const err = new Error('이미 친구요청을 보냄');
                    err.status = 409;
                    next(err);
                } else {
                    let result = await Request.create({
                        sender: auth,
                        targetId: req.body.targetId,
                    });
                    res.send(result);
                }
            }
        } catch (err) {
            next(err);
        }
    }
});

// 친구 요청 현황보기 API
router.get('/request', async (req, res, next)=>{
    let token = req.get("token");
    if(token) {
        try {
            let auth = await verify(token, 'jwt');
            if(auth) {
                let result = await Request.findAll({
                    where: {targetId: auth}
                });
                res.json(result);
            }
        } catch (err) {
            next(err);
        }
    }
});

// 친구 추가 승인 API
router.post('/', async (req, res, next)=>{
    let token = req.get("token");
    if(token) {
        try {
            let auth = await verify(token, 'jwt');
            if(auth) {
                let result1 = await Friend.create({
                    targetId: req.body.targetId,
                });
                await result1.setUsers(auth);
                let result2 = await Friend.create({
                    targetId: auth,
                });
                await result2.setUsers(req.body.targetId);
                await Request.destroy({
                    where: {sender: req.body.targetId, targetId: auth}
                });
                res.json(result1);
            }
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;