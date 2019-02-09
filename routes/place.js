const express = require('express');
const { verify } = require('../middlewares/util');

const Place = require('../models').Place;

const router = express.Router();

router.get('/locate/:district',async (req, res)=>{
    let token = req.get("token");
    if(token) {
        try {
            let auth = await verify(token, 'jwt');
            if(auth) {
                console.log(req.params.district);
                const recommands = await Place.findAll({where: {district: req.params.district}});
                if(recommands) {
                    res.json(recommands);
                }
            }
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;