 const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); 

router.post('/signup',async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where : {email : req.body.email}
        });
        if(user){
            return res.status(403).send("이미 사용 중인 이메일입니다");
        }
    
        const user2 = await User.findOne({ //nickname이 같은 사람이 있는지 검사
            where: {
                nickname: req.body.nickname,
            }
        })
        if (user2) {
            return res.status(403).send('이미 사용 중인 닉네임 입니다');
        }
    
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ //await 안넣어주면, 비동기이기 때문에, 뒤에 res.json()이 먼저실행될수도있음.
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        })
        res.status(200).send('ok')
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;