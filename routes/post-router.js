
//post-router.js

const express = require('express'),
      router  = express.Router();

const HappyRedis = require('../happyredis');

//추가 
const webpush = require('web-push');

//post create
router.post('/', (req, res, next) => {
  let post = req.body,
      redisClient = new HappyRedis();

  //id를 발급하기 위해 lastId에 1 증가시켜서 가져옴
  redisClient.hincrby('post', 'lastId', 1, (idErr, lastId) => {
    if(idErr) {
      return next(idErr);
    }

    post.id = lastId;
    redisClient.hset('post', lastId, JSON.stringify(post), (insertErr, affectedRows) => {
      if(insertErr) {
        return next(insertErr);
      }

      //subscription들 조회
      redisClient.hgetall('subscription', (getErr, subscriptions) => {
        redisClient.quit();
        
        if(getErr) {
          return next(getErr);
        }

        //weppush -> (신분증명 email(가짜도 가능), vapid public key, vapid private key)
        webpush.setVapidDetails('mailto:sistina9573@gmail.com', 'BAJOEdjbkoG7c1yuu0FaNk-naDVs9Q90DyR686uKpVjRHmtf5pf6t1Tc6ne6JDnAuCAuT9n5qM2uHg4vsCiFWrs', 'GQMM_zPKyrkYmCkGiWqmLgaJx5zQDBwlxRizepv5zBk');
        
        for(let key in subscriptions) {
          if(key === 'lastId')
            continue;

          const sub = JSON.parse(subscriptions[key]);

          const pushConfig = {
            endpoint : sub.endpoint,
            keys : {
              auth : sub.keys.auth,
              p256dh : sub.keys.p256dh
            }
          }

          //push server에 message send
          webpush.sendNotification(pushConfig, JSON.stringify({
            title : "새로운 방명록",
            context : post.context
          })).catch( err => {
            console.error(err);
          });
        }
        res.status(200).json(post);
      });
    })
  });
});


//post read
router.get('/:id', (req, res, next) => {
  let id = req.params.id,
      redisClient = new HappyRedis();

  redisClient.hget('post', id, (err, data) => {
    redisClient.quit();

    if(err) {
      return next(err);
    }
    res.status(200).json(JSON.parse(data));
  });
});


//post update
router.put('/:id', (req, res, next) => {
  let id = req.params.id,
      post = req.body,
      redisClient = new HappyRedis();

  redisClient.hset('post', id, JSON.stringify(post), (updateErr, affectedRows) => {
    redisClient.quit();

    if(updateErr) {
      return next(updateErr);
    }
    res.status(200).json(post);
  })
});


//post delete
router.delete('/:id', (req, res, next) => {
  let id = req.params.id,
      redisClient = new HappyRedis();

  redisClient.hdel('post', id, (err, affectedRows) => {
    redisClient.quit();

    if(err) {
      return next(err);
    }
    res.json({ affectedRows });
  });
});


//post list 조회
router.get('/', (req, res, next) => {
  let redisClient = new HappyRedis();

  redisClient.hgetall('post', (err, data) => {
    redisClient.quit();

    if(err) {
      return next(err);
    }
    let posts = [];

    for(let key in data) {
      if(key === 'lastId')
        continue;

      posts.push(JSON.parse(data[key]));
    }
    res.status(200).json(posts);
  });
});

module.exports = router;