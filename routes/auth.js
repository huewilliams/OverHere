const express = require('express');
let jwt = require('jsonwebtoken');

let User = require('../models').User;

let router = express.Router();

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