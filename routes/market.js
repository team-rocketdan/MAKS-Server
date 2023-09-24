const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:name', (req, res) => { // 단어 포함 가게 조회
    console.log(req.params.name);

    var sql = `select * from market where NAME like '%${req.params.name}%'`;
    conn.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
    })
});

module.exports = router;