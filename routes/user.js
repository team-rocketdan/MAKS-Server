const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:type/:uid', (req, res) => {
    if(req.params.type == 'read') { // id에 해당하는 사용자 정보 조회
        var sql = `select * from USER where id = '${req.params.uid}'`; // u
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    } else if(req.params.type == 'delete') { // id에 해당하는 사용자 정보 삭제
        var sql = `delete from USER where id = '${req.params.uid}'`; // u
        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        });
    }  
});

router.get('/:id/:field/:data', (req, res) => { // id에 해당하는 사용자 정보 수정
    var sql = `update USER set ${req.params.field} = '${req.params.data}' where id = '${req.params.id}'`;
    conn.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
    });
});

module.exports = router;