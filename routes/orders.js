const express = require('express');
/* const path = require('path'); */
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

/* router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/public.join.html'));
});

router.post('/', (req, res) => {
    const body = req.body;
    const email = body.email;
}) */

router.get('/:id/:type', (req, res) => {
    console.log(req.params.id);
    console.log(req.params.type);

    if(req.params.type == 'read') { // 사용자 주문 조회
        var sql = `select * from orders where O_ID = ${req.params.id}`;
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    } else if(req.params.type == 'delete') { // 현재 주문 취소
        var sql = `delete from orders where O_ID = ${req.params.id}`;
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