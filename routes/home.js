const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

/* 회원 가입해서 아이디 등록하기
router.get('/', (req, res) => {
    conn.query('select * from user', (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});
*/