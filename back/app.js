const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const morgan = require('morgan');
const db = require('./models');

const userRouter = require('./routes/user');

dotenv.config();
const app = express();

db.sequelize.sync()
    .then(() => {
        console.log("db연결 성공");
    })
    .catch((err) => {
        console.error(err);
    })

app.use(cors({
    origin: true,
    credentials: true, //이걸 해줘야 cookie도 같이 보낼 수 있다.
}));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
        httpOnly: true, //cookie는 javascript로 조작할 수 없도록.
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.byjuun.com'
    }
}));

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send("Plan Manager");
})

app.listen(3060, () => {
    console.log("서버 실행 중");
})
