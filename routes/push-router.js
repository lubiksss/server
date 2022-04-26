//push-router.js

const express = require('express'),
      router  = express.Router();

const HappyRedis = require('../happyredis');

//subscription create
router.post('/subscriptions', (req, res, next) => {
  let subscription = JSON.parse(req.body.subscription),
      redisClient = new HappyRedis();


  //id를 발급하기 위해 lastId에 1 증가시켜서 가져옴
  redisClient.hincrby('subscription', 'lastId', 1, (idErr, lastId) => {
    if(idErr) {
      return next(idErr);
    }

    subscription.id = lastId;
    redisClient.hset('subscription', lastId, JSON.stringify(subscription), (insertErr, affectedRows) => {
      redisClient.quit();

      if(insertErr) {
        return next(insertErr);
      }
      res.status(200).json(subscription);
    })
  });
});

module.exports = router;