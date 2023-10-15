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

router.get('/:uid/:mkid', (req, res) => {
    console.log(req.params.uid);
    console.log(req.params.mkid);
    console.log(req.query.menus); // ["aa","bb"]
    console.log(req.query.price);

    uid=req.params.uid;
    mkid=req.params.mkid;
    price=req.query.price;
    menus=JSON.stringify(req.query.menus); // aa,bb
    console.log(menus);

    
    for(i=0; i<req.query.menus.length; i++) { // 사용자 주문
        req.query.menus[0];
    }
    oid=Math.floor(Math.random() * 1000001);
    var sql = `insert into ORDERS values (${oid}, json_object('list', json_array('${menus[0]}','${menus[1]}')), ${price}, default, 0, 'ing', '${uid}', ${mkid})`;
    conn.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
    });
});

router.get('/:type1/:type2/:var', (req, res) => {
    console.log(req.params.type1);
    console.log(req.params.type2);
    console.log(req.params.var);

    if(req.params.type1 == 'read') {
        if(req.params.type2=='oid'){
            var sql = `select * from ORDERS where O_ID = ${req.params.var}`;
            conn.query(sql, (err, rows) => {
                if(err) {
                    throw err;
                }
                console.log(rows);
                res.send(rows);
            });
        }else if(req.params.type2=='mkid'){
            var sql = `select * from ORDERS where MK_ID = ${req.params.var} order by C_AT desc`;
            conn.query(sql, (err, rows) => {
                if(err) {
                    throw err;
                }
                console.log(rows);
                res.send(rows);
            });
        }else if(req.params.type2=='uid'){
            var sql = `select * from ORDERS where U_ID = '${req.params.var}' order by C_AT desc`;
            conn.query(sql, (err, rows) => {
                if(err) {
                    throw err;
                }
                console.log(rows);
                res.send(rows);
            });
        }
    } else if(req.params.type1 == 'delete') { // 주문 정보 삭제
        var sql = `delete from orders where O_ID = ${req.params.var}`;
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