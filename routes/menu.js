const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:type/:var', (req, res) => {
    if(req.params.type=='mkid'){ // marketID로 매장에 존재하는 메뉴 조회
        var sql = `select * from MENU where marketID = ${req.params.var}`; // MARKET ID
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    } else if(req.params.type=='nuid'){ // id에 해당하는 메뉴 조회
        var sql = `select * from MENU where id = ${req.params.var}`; // MENU ID
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    }
});

module.exports = router;