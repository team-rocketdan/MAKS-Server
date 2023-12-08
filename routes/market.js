const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:type/:var', (req, res) => {
    if(req.params.type=='mkid'){ // marketID로 매장 조회
        var sql = `select * from MARKET where id = ${req.params.var}`;
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        })
    } else if(req.params.type=='name'){ // name에 검색 단어 포함된 매장 조회
        var sql = `select * from MARKET where name like '%${req.params.var}%'`;
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