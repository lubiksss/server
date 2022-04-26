//app.js
const express = require('express'),
      cors    = require('cors');


const postRouter = require('./routes/post-router');
const pushRouter = require('./routes/push-router');

const hostname = '163.152.20.161';

const app = express();

const fs = require('fs');

const https = require('https');

const options = {
  key: fs.readFileSync('../ssl2/domain2.com.key'), //push-notification.kro.kr
  cert: fs.readFileSync('../ssl2/domain.com.crt'), //cert: 디지털 인증서(여기서는 domain.com.crt)
  ca: fs.readFileSync('../ssl2/rootca.crt') //ca: ROOT CA 인증서(여기서는 rootca.crt)
};




//CORS 허용
app.use(cors({ 
  origin(origin, callback) {
    callback(null, true)
  },
  credentials : true 
}));

// CORS 허용하기 
app.get('/api', (req,res) =>{
  res.header("Acess-Control-Allow-Origin", "push-notification.kro.kr:8888");
  res.send(data);
})

//application/json 형태의 데이터 req.body에 저장
app.use(express.json());
//www-form-urlencode 형태의 데이터 req.body에 저장
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postRouter);
app.use('/push', pushRouter);

//Error Handler
app.use((err, req, res, next) => {
  console.log('++++++++++++++Error!!!!!+++++++++++++', err.message);
  console.log(err.stack);
  res.status(err.status || 500);
  res.json({ code : err.code, msg : err.message, status : err.status });
});

module.exports = app;

// app.listen(7777, () => {
//     console.log("####################");
//     console.log("### Server Start ###");
//     console.log("####################");
//   });

https.createServer(options, app).listen(7777, hostname, function() {
    console.log("HTTPS server listening on port " + 7777);
  });