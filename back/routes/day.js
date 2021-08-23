const express = require('express');
const router = express.Router();
const { Day } = require('../models'); 
const { Plan } = require('../models'); 
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
});

router.get('/today',isLoggedIn,async(req,res,next)=>{
    try{
        const today = String(new Date().getFullYear())+String(new Date().getMonth()+1)+String(new Date().getDate());
        const todayPlan = await Day.findOne({
            where : {dayinfo : today}
        })
        if(!todayPlan){
            return res.status(403).send("아직 오늘 계획이 없습니다");
        }

        const fulltodayPlan = await Day.findOne({
            where : {dayinfo : today},
            include : [{
                model : Plan,
                attributes : {
                    exclude : ['createdAt','updatedAt']
                },
            }]
        })
        res.status(201).json(fulltodayPlan);
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;