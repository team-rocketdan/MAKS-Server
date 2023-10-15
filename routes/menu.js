const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:type/:var', (req, res) => { // ID에 따른 메뉴 조회
    console.log(req.params.var);

    if(req.params.type=='mkid'){ // 가게
        var sql = `select * from MENU where MK_ID = ${req.params.var}`;
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    } else if(req.params.type=='nuid'){ // 메뉴
        var sql = `select * from menu where NU_ID = ${req.params.var}`;
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