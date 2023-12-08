<h1>Database</h1>

* Amazon RDS Instance와 MySQL Server를 연결한다.     
* MySQL Workbench Connection 내에서 SQL 쿼리를 작성하여 Database를 설계한다.
* 자세한 방법은 https://melody2108-20.tistory.com/3 의 첫번째, 두번째 파트를 참고한다.
* 이하는 필자가 설계한 Database의 Table 목록으로, 소스 코드는 아래의 형식으로 작성하였다.

```
create table USER (
     id varchar(20) not null, 
     name varchar(200) not null,
     email varchar(40) not null,
     loginCenter varchar(10),
     profileImage varchar(200) default '',
     createdAt datetime default now(),
     primary key(id)
) default charset = utf8mb4;
```

```
insert into USER values
('heroes51', '이정후', 'heroes51@gmail.com', 'kakao', default, '2020-08-12 12:12:17'),
('tigers47', '나성범', 'tigers47@gmail.com', 'apple', default, default);
  ```
 
<h3>USER</h3>

|id|name|email|loginCenter|profileImage|createdAt|
|--|----|-----|-----------|------------|---------|
|heroes51|이정후|heroes51@gmail.com|kakao|DEFAULT|2020-08-12 12:12:17|
|tigers47|나성범|tigers47@gmail.com|apple|DEFAULT|DEFAULT| 

>  id -- VARCHAR(20) >> PRIMARY KEY    
>  name -- VARCHAR(200)     
>  email -- VARCHAR(40)        
>  loginCenter -- VARCHAR(10)       
>  profileImage -- VARCHAR(200)      
>  createdAt -- DATETIME << DEFAULT = 생성 시각      

<h3>MANAGER</h3>

|id|name|tel|businessNumber|
|--|----|---|--------------|
|456661|고형욱|010-5410-4658|26-1673|
|988106|심재학|010-7126-3966|10-6306|

>  id -- INT >> PRIMARY KEY      
>  name -- VARCHAR(200)    
>  tel -- VARCHAR(20)        
>  businessNumber -- VARCHAR(30)     

<h3>MARKET</h3>

|id|name|coverImage|coordinate|status|
|--|----|----------|----------|------|
|20031|이씨네 카페|DEFAULT|ST_GeomFromText('POINT(122.567 212.136)')|end|
|75690|김씨네 햄버거|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9E%A5+%EC%82%AC%EC%A7%84.jpg|NULL|DEFAULT|

>  id -- INT >> PRIMARY KEY     
>  name --  VARCHAR(200)     
>  coverImage -- VARCHAR(200)    
>  coordinate -- POINT       
>  status -- VARCHAR(10) << DEFAULT = 'ing'   

<h3>MENU</h3>

|id|marketID|name|price|description|image|
|--|--------|----|-----|-----------|-----|
|23540697|20031|말차라떼|5100|NULL|DEFAULT|
|59113950|20031|딸기케이크|4700|NULL|DEFAULT|
|90012662|20031|아메리카노|4300|NULL|DEFAULT|
|14003658|75690|감자튀김|3500|진짜 감자로만 튀긴 튀김|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B0%90%EC%9E%90%ED%8A%80%EA%B9%80.jpg|
|40981666|75690|콜라|2000|탄산이 톡톡 터져요|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EC%BD%9C%EB%9D%BC.png|
|64100535|75690|치즈버거|6000|진짜 치즈만으로 만들어진 치즈버거|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EC%B9%98%EC%A6%88%EB%B2%84%EA%B1%B0.png|

>  id -- INT >> PRIMARY KEY       
>  marketID -- INT >> FOREIGN KEY        
>  name -- VARCHAR(200)        
>  price -- INT       
>  description -- VARCHAR(200)      
>  image -- VARCHAR(200)          

<h3>ORDERS</h3>

|id|userID|marketID|createdAt|menus|totalPrice|isTakeout|status|
|--|------|--------|---------|-----|----------|---------|------|
|145203|heroes51|20031|2019-10-06 11:10:50|{"23540697": 2, "59113950": 2}|19600|1|end|
|200364|tigers47|75690|DEFAULT|{"14003658": 3, "64100535": 1}|16500|0|DEFAULT|

>  id -- INT >> PRIMARY KEY      
>  userID -- VARCHAR(20) >> FOREIGN KEY        
>  marketID -- INT >> FOREIGN KEY        
>  createdAt -- DATETIME << DEFAULT = 생성 시각        
>  menus -- JSON      
>  totalPrice -- INT  
>  isTakeout -- TINYINT     
>  status -- VARCHAR(10) << DEFAULT = 'ing'    

<h1>Source Code</h1>

<h3>database.js</h3>

```
module.exports = {
    host: 'maks-database.cqfnpacnwfir.ap-northeast-2.rds.amazonaws.com',
    user: 'melody2108',
    password: '162071049',
    database: 'maksDB'
};
```

* host? 필자가 이용한 Amazon RDS Instance의 엔드포인트
* user? 필자가 이전 단계에서 설정한 사용자 이름
* password? 필자가 이전 단계에서 설정한 비밀번호
* database? 필자가 이전 단계에서 설계한 Database의 이름

<h3>app.js</h3>

```
const express = require('express');
const mysql = require('mysql');
const dbInfo = require('./config/database.js');
var conn = mysql.createConnection(dbInfo);
```

1. 필자는 Node.js를 위한 웹 애플리케이션 프레임워크인 Express.js를 사용하였고, 이는 require 함수로 필요한 모듈을 불러와 이용한다. 이전 단계에서 설계한 MySQL Database를 활용하기 위해 database.js에서 설정했던 호스트, 사용자, 비밀번호, 데이터베이스명에 대한 정보를 포함한 database.js 모듈을 불러와 dbInfo 변수에 저장한다. 이를 이용해 MySQL과의 커넥션을 생성하면 해당 Database 사용이 가능하다.

```
var userRouter = require('./routes/user.js');
var marketRouter = require('./routes/market.js');
var menuRouter = require('./routes/menu.js');
var orderRouter = require('./routes/orders');

app.use('/user', userRouter);
app.use('/market', marketRouter);
app.use('/menu', menuRouter);
app.use('/orders', orderRouter);
```

2. Express.js는 HTTP 요청 메소드에 따라 다양한 엔드포인트에 대한 라우팅이 가능한데, 필자는 여러 라우팅을 하나의 모듈로 구조화하는 Router 객체를 사용하였다. 메인 파일인 app.js에서는 라우터 모듈을 불러와 변수에 저장한 후 사용하고, Router를 exports하는 파일에서 실질적인 기능을 구현한다. 위의 소스 코드를 예시로 들자면, user에 관한 실질적인 기능은 app.js 파일이 아닌 user.js 파일에 구현되는 것이다.

<h3>routes/---.js</h3>

```
const express = require('express');
const mysql = require('mysql');
const dbInfo = require('../config/database.js');
var conn = mysql.createConnection(dbInfo);
var router = express.Router();

router.get('/:type/:var', (req, res) => {
    if(req.params.type == '---'){
        var sql = `select * from --- where --- = ${req.params.var}`;

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
```

3. 필자는 routes 폴더 아래에서 Router를 exports하는 파일들을 모아 관리한다. 해당 파일들의 기본 구조는 위와 같고, app.js 파일에서처럼 필요한 모듈들을 require 함수로 불러와 사용한다. 중요한 것은 router.get 블록 속의 내용이다. /:--- 형식으로 사용자로부터 정보를 받으면 req.params 객체 아래에 변수로 저장되는데, 위에서는 /:type의 정보가 req.params.type 변수에 저장된 것이다.
     
5. 변수는 if문의 분기나 sql 문의 where 조건에 활용된다. sql문은 ``(백틱)으로 선언되고, 해당 Router에서 구현할 기능에 따라 적절한 MySQL 문법으로 작성된다. 또한 sql문 안에서는 ${변수} 형식을 통해 변수를 사용할 수 있다. conn 객체를 활용하여 sql문을 실행하면 기능 구현이 완료되고, 마지막으로 Router를 exports하며 끝맺는다.

<h3>market.js</h3>

```
router.get('/:type/:var', (req, res) => {
    if(req.params.type=='mkid'){
        var sql = `select * from MARKET where id = ${req.params.var}`;

        conn.query(sql, (err, rows) => {
            if(err) {
                throw err;
            }
            console.log(rows);
            res.send(rows);
        })
    }
});
```

5. 예시로 market.js를 살펴보겠다. 사용자가 입력한 첫번째 정보는 req.params.type에, 두번째 정보는 req.params.var에 저장된다. marketID를 조회하기 위한 목적으로 판단되면(mkid 입력되어야 함), if문 블록 속의 내용을 실행한다. sql문은 select문으로 req.params.var의 정보와 id 값이 같은 매장의 정보를 조회하는 것이다. 이를 실행한 후, 사용자가 입력한 값에 맞는 id를 가진 매장이 존재한다면 해당 정보가 뜰 것이다.

<h1>How to Test</h1>

* Amazon EC2에 서버를 배포하여 Data 및 사용자 입력이 잘 반영되는지 테스트한다.
* 특정 운영체제 및 애플리케이션을 실행하는 독립적인 환경인 인스턴스를 이용한다.
* 자세한 방법은 https://melody2108-20.tistory.com/3 의 <Amazon EC2에 서버 배포> 파트를 참고한다.
