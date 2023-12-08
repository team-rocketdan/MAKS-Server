const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:type/:var', (req, res) => {
    console.log(req.params.type);
    console.log(req.params.var);

    if(req.params.type=='mkid'){ // 마켓 ID로 가게 조회
        var sql = `select * from MARKET where id = ${req.params.var}`; // ID
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        })
    } else if(req.params.type=='name'){ // 이름에 단어 포함된 마켓 조회
        var sql = `select * from MARKET where name like '%${req.params.var}%'`; // NAME
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        })
    }
});

module.exports = router;