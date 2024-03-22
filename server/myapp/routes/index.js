var express = require('express');
var router = express.Router();
var user = require('../modules/handel')

router.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS");
  res.header("X-Powered-By", "Express");
  res.header("Content-Type", "text/html; charset=UTF-8");
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/queryAll', function (req, res, next) {
  user.queryAll(req, res, next)
})
router.post('/insertHashPwd', function (req, res, next) {
  user.insertHashPwd(req, res, next)
})
router.post('/insertOtherInfo', function (req, res, next) {
  user.insertOtherInfo(req, res, next)
})
router.post('/delectOtherInfo', function (req, res, next) {
  user.delectOtherInfo(req, res, next)
})
router.post('/updatePassword', function (req, res, next) {
  user.updatePassword(req, res, next)
})
router.get('/isMasterKeySame', function (req, res, next) {
  user.isMasterKeySame(req, res, next)
})

module.exports = router;
