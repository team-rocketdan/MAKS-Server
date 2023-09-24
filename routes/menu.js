const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:id', (req, res) => { // 가게 전체 메뉴 조회
    console.log(req.params.id);

    var sql = `select * from menu where MK_ID = ${req.params.id}`;
    conn.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
    });
});

module.exports = router;