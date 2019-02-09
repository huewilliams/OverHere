const express = require('express');
const { verify } = require('../middlewares/util');

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

module.exports = router;