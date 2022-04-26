//app.js
const express = require('express'),
      cors = require('cors');


const postRouter = require('./routes/post-router');
const pushRouter = require('./routes/push-router');
const route = require('./routes/router');

const hostname = '163.152.20.161';

const app = express();

app.use(express.static('public'));

const fs = require('fs');

const https = require('https');

const path = require('path');




// const options = {
//   key: fs.readFileSync('../ssl2/domain2.com.key'), //push-notification.kro.kr
//   cert: fs.readFileSync('../ssl2/domain.com.crt'), //cert: 디지털 인증서(여기서는 domain.com.crt)
//   ca: fs.readFileSync('../ssl2/rootca.crt') //ca: ROOT CA 인증서(여기서는 rootca.crt)
// };




//CORS 허용
app.use(cors({
  origin(origin, callback) {
    callback(null, true)
  },
  credentials: true
}));

// CORS 허용하기 
app.get('/api', (req, res) => {
  res.header("Acess-Control-Allow-Origin", "https://test-pm.herokuapp.com");
  res.send(data);
})

// app.get('/*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
//  })
 

//application/json 형태의 데이터 req.body에 저장
app.use(express.json());
//www-form-urlencode 형태의 데이터 req.body에 저장
app.use(express.urlencoded({
  extended: false
}));

app.use('/posts', postRouter);
app.use('/push', pushRouter);
app.use('/', route);

//Error Handler
app.use((err, req, res, next) => {
  console.log('++++++++++++++Error!!!!!+++++++++++++', err.message);
  console.log(err.stack);
  res.status(err.status || 500);
  res.json({
    code: err.code,
    msg: err.message,
    status: err.status
  });
});

module.exports = app;



var port = process.env.PORT || 3000;

// https.createServer(options, app).listen(port, hostname, function () {
//   console.log("HTTPS server listening on port " + port);
// });

// https.createServer(app).listen(port, hostname, function () {
//   console.log("HTTPS server listening on port " + port);
// });


app.listen(port, () => {
    console.log("####################");
    console.log("### Server Start ###");
    console.log("####################");
    console.log("port : ", port);
  });