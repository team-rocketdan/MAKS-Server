const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:id/:type', (req, res) => {
    console.log(req.params.id);
    console.log(req.params.type);

    if(req.params.type == 'read') { // 사용자 정보 조회
        var sql = `select * from user where U_ID = '${req.params.id}'`;
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    } else if(req.params.type == 'delete') { // 사용자 정보 삭제
        var sql = `delete from user where U_ID = '${req.params.id}'`;
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    }  
});

router.get('/:id/:field/:data', (req, res) => { // 사용자 정보 수정
    console.log(req.params.id);
    console.log(req.params.field);
    console.log(req.params.data);

    var sql = `update user set ${req.params.field} = '${req.params.data}' where U_ID = '${req.params.id}'`;
    conn.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
    });
});

module.exports = router;