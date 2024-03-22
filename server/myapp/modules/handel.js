// 引入mysql
var mysql = require('mysql')
// 引入mysql连接配置
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lwq7blue',
  database: 'forest_blog'
});
var userData = {
  // 查询所有数据
  queryAll: function (req, res, next) {
    let queryAll = 'SELECT * FROM other_info'
    connection.query(queryAll, function (err, result) {
      if (err) {
        res.json({
          code: '1',
          msg: '操作失败'
        })
      } else {
        res.json({
          code: '200',
          msg: '查找数据成功',
          data: result
        })
      }
    })
  },
  // 插入加密后的主密钥
  insertHashPwd: function (req, res, next) {
    const masterPassword = req.body.masterPassword
    let queryAll = 'SELECT master_password FROM master_password'
    connection.query(queryAll, function (err, result) {
      console.log(result.length);
      if (result.length > 0) {
        let storedMasterKey = result[0].master_password
        if (storedMasterKey === masterPassword) {
          res.json({
            code: '200',
            msg: '登录成功'
          })
        }
        else {
          res.json({
            code: '1',
            msg: '登录失败'
          })
        }
      }
      else {
        let sql = `INSERT INTO master_password (master_password) VALUES ('${masterPassword}');`
        connection.query(sql, function (err, result) {
          if (err) {
            res.json({
              code: '1',
              msg: '操作失败'
            })
          }
          else {
            res.json({
              code: '200',
              msg: '设置成功',
              data: result
            })
          }
        })
      }
    })
  },
  // 插入域名等其他信息
  insertOtherInfo: function (req, res, next) {
    console.log(req.body);
    let { site, login, options } = req.body
    let { lowerCase, upperCase, digital, specialCharacters, length, counter } = options
    let sql = `INSERT INTO other_info (site, username, lower_case, upper_case,digital,special_characters,pass_length,counter)
    VALUES ('${site}','${login}',${lowerCase},${upperCase},${digital},${specialCharacters},${length},${counter});`
    connection.query(sql, function (err, result) {
      if (err) {
        res.json({
          code: '1',
          msg: '操作失败'
        })
      } else {
        res.json({
          code: '200',
          msg: '插入数据成功',
          data: result
        })
      }
    })
  },
  // 删除某条密码相关数据
  delectOtherInfo: function (req, res, next) {
    console.log(req.body);
    const delId = req.body.id
    let sql = `DELETE FROM other_info WHERE id='${delId}'`
    connection.query(sql, function (err, result) {
      console.log(err);
      if (err) {
        res.json({
          code: '1',
          msg: '操作失败'
        })
      } else {
        res.json({
          code: '200',
          msg: '删除数据成功',
          data: result
        })
      }
    })
  },
  // 更新密码
  updatePassword: function (req, res, next) {
    console.log(req.body);
    const { id, counter } = req.body
    let sql = `UPDATE other_info 
    SET counter=${counter}
    WHERE id='${id}';`
    connection.query(sql, function (err, result) {
      console.log(err);
      if (err) {
        res.json({
          code: '1',
          msg: '操作失败'
        })
      } else {
        res.json({
          code: '200',
          msg: '更新数据成功',
          data: result
        })
      }
    })
  },
  // 校验主密钥是否一致
  isMasterKeySame: function (req, res, next) {
    console.log(req.query);
    const { masterPassword } = req.query
    let sql = `SELECT master_password FROM master_password;`
    connection.query(sql, function (err, result) {
      if (err) {
        res.json({
          code: '1',
          msg: '操作失败'
        })
      } else {
        let storedMasterKey = result[0].master_password
        if (storedMasterKey === masterPassword) {
          res.json({
            code: '200',
            msg: '校验成功'
          })
        }
        else {
          res.json({
            code: '2',
            msg: '校验失败'
          })
        }
      }
    })
  },
}
module.exports = userData