const express = require('express');
/* const path = require('path'); */
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:uid/:mkid', (req, res) => {
    console.log(req.query.ids); // ["23540697":1,"64100526":3]
    console.log(req.query.counts);
    console.log(req.query.ids.length);

    oid=Math.floor(Math.random() * 1000001);
    uid=req.params.uid;
    mkid=req.params.mkid;
    price=req.query.price;
    
    for (i=0; i<req.query.ids.length; i++) {
        if (i=0) {
            const json = `{"${req.query.ids[0]}": ${req.query.counts[0]}}`;
        } else {
            json[`${req.query.ids[i]}`] = `${req.query.counts[i]}`;
        }     
    }
    
    var sql = `insert into ORDERS values (${oid}, '${uid}', ${mkid}, default, json, ${price}, 0, 'ing')`;

    /*var sql = `insert into ORDERS values (${oid}, '${uid}', ${mkid}, default,
        '{"${req.query.ids[0]}": ${req.query.counts[0]}, "${req.query.ids[1]}": ${req.query.counts[1]}}', ${price}, 0, 'ing')`; */
    
        conn.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
    });
});

router.get('/:type1/:type2/:var', (req, res) => {
    if(req.params.type1 == 'read') {
        if(req.params.type2=='oid'){ // id에 해당하는 주문 정보 조회
            var sql = `select * from ORDERS where id = ${req.params.var}`; // o
            conn.query(sql, (err, rows) => {
                if(err) {
                    throw err;
                }
                console.log(rows);
                res.send(rows);
            });
        }else if(req.params.type2=='mkid'){ // marketID에 해당하는 매장의 주문 정보 조회
            var sql = `select * from ORDERS where marketID = ${req.params.var} order by createdAt desc`; // mk, c_at
            conn.query(sql, (err, rows) => {
                if(err) {
                    throw err;
                }
                console.log(rows);
                res.send(rows);
            });
        }else if(req.params.type2=='uid'){ // userID에 해당하는 사용자의 주문 정보 조회
            var sql = `select * from ORDERS where userID = '${req.params.var}' order by createdAt desc`; // u, c_at
            conn.query(sql, (err, rows) => {
                if(err) {
                    throw err;
                }
                console.log(rows);
                res.send(rows);
            });
        }
    } else if(req.params.type1 == 'delete') { // id에 해당하는 주문 정보 삭제
        var sql = `delete from ORDERS where id = ${req.params.var}`;
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