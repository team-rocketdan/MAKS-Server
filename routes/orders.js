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

router.get('/:uid/:mkid/:price', (req, res) => {
    console.log(req.params.uid);
    console.log(req.params.mkid);
    console.log(req.params.price);
    console.log(req.query.ids); // ["23540697":1,"64100526":3]
    console.log(req.query.counts);

    uid=req.params.uid;
    mkid=req.params.mkid;
    price=req.params.price;

    oid=Math.floor(Math.random() * 1000001);
    
    /* for(i=0; i<req.query.ids.length; i++) {
        // 메뉴 개수에 따라 변경
    } */
    
    var sql = `insert into ORDERS values (${oid}, 
        '{"${req.query.ids[0]}": ${req.query.counts[0]}, "${req.query.ids[1]}": ${req.query.counts[1]}}', ${price}, default, 0, 'ing', '${uid}', ${mkid})`;
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
        var sql = `delete from ORDERS where O_ID = ${req.params.var}`;
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