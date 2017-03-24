const express = require('express'); // express 모듈
const path = require('path'); // path 모듈
const bodyParser = require('body-parser'); // body-parser 모듈
const app = express(); // express 객체 생성 - 서버 연동 및 라우팅 ! Backend의 대부분 기능을 담당
const port = process.env.PROT || 3000; // port 지정

app.use(express.static(path.join(__dirname, '/../../dist'))); // dist 폴더 (WebPack) 을 정적폴더로 Setting . WebPack을 서버에 올려놓는다 생각하면 될 듯!
app.use(bodyParser.json()); //텍스트를 JSON으로 파싱하고 결과 객체를 req.body에 표시합니다. 이 부분이 없으니까 Client에서 POST로 넘긴 데이터가 undefined !
app.use(bodyParser.urlencoded({ extended: false }));
//텍스트를 URL로 인코딩 된 데이터 (브라우저가 POST로 설정된 일반 양식에서 양식 데이터를 보내는 경향이있는 방식 )로 구문 분석하고 결과 객체 (키 및 값 포함)를 req.body에 표시합니다.


// ** MongoDB Setting ** //
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;
mongoose.Promise = global.Promise;

const Contact = require('./model/contact.model.js'); // Contact

db.on('error', console.error.bind(console, 'DB Connection Error:')); // DB 연결에 실패했을 때 로그
db.once('open', () => { // DB 연결에 성공했을 때 
    console.log('Connected to MongoDB');

    app.put('/contact/:id', (req, res) => {
        Contact.findOneAndUpdate({ _id: req.params.id }, req.body, err =>{
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    app.delete('/contact/:id', (req, res) => {
        Contact.findOneAndRemove({ _id: req.params.id }, err => {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    app.get('/contacts', (req, res) => {
        Contact.find({}, (err, doc) => {
            res.status(200).json(doc);
        });
    });

    app.post('/contact', (req, res) => {
        var obj = new Contact(req.body);
        obj.save((err, obj) => {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // '/' --> dist 폴더에 있는 index.html 로드
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    });

    app.listen(port, () => {
        console.log(`${port} Port Server On`);
    });

});
