const express = require('express');
const router = express.Router();
const { Day } = require('../models'); 
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.post('/',isLoggedIn,async(req,res,next)=>{
    try{
        const theday = await Day.findOne({
            where : {dayinfo : req.body.dayInfo}
        });
        if(theday){
            return res.status(403).send("이미 계획을 작성한 날짜입니다.");
        }

        await Day.create({ //await 안넣어주면, 비동기이기 때문에, 뒤에 res.json()이 먼저실행될수도있음.
            dayinfo : req.body.dayInfo,
            UserId : req.user.id,
        })
        res.status(200).send('ok')
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;