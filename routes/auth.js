const express = require('express');
let jwt = require('jsonwebtoken');

let User = require('../models').User;

let router = express.Router();

router.post('/signIn', async (req, res, next)=>{
    try {
        const user = await User.findOne({
            where: {id: req.body.id, password: req.body.password},
        });
        if(user) { // 아이디 패스워드에 해당하는 사용자가 존재할 때
            let token = sign(user);
            res.json({token: token})
        } else { // 아이디 패스워드에 해당하는 사용자를 찾지 못했을 때
            const err = new Error('id or password incorrect');
            err.status = 401;
            next(err);
        }
        function sign(user) {
            let token = jwt.sign({
                    // 토큰의 내용 (payload)
                    username: user.username,
                    id: user.id,
                },
                'jwt', // 비밀키
                {
                    expiresIn: '100h' // 유효시간 100시간
                }
            );
            return token;
        }
    } catch (err) {
        next(err);
    }
});

router.post('/signUp', async (req, res, next)=>{
    try {
        const user = await User.findOne({
            where: {id: req.body.id},
        });
        if(user) { // id가 중복된 사용자가 존재할 경우
            const err = new Error('id Duplication');
            err.status = 409;
            next(err);
        } else {
            let result = await User.create({
                id: req.body.id,
                password: req.body.password,
                username: req.body.username,
                age: req.body.age,
                gender: req.body.gender,
            });
            res.json({result});
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;