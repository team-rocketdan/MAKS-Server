<h1>Database</h1>

* Amazon RDS Instance와 MySQL Server를 연결한다.     
* MySQL Workbench Connection 내에서 SQL 쿼리를 작성하여 Database를 설계한다.
* 자세한 방법은 https://melody2108-20.tistory.com/3 링크를 참고한다.
 
<h3>USER Table</h3>

|id|name|email|loginCenter|profileImage|createdAt|
|--|----|-----|-----------|------------|---------|
|heroes51|이정후|heroes51@gmail.com|kakao|DEFAULT|2020-08-12 12:12:17|
|tigers47|나성범|tigers47@gmail.com|apple|DEFAULT|DEFAULT| 

>  id -- varchar(20) | PRIMARY KEY    
>  name -- varchar(200)    
>  email -- varchar(40)      
>  loginCenter -- varchar(10)      
>  profileImage -- varchar(200)     
>  createdAt -- datetime    

<h3>MANAGER Table</h3>

|id|name|tel|businessNumber|
|--|----|---|--------------|
|456661|고형욱|010-5410-4658|26-1673|
|988106|심재학|010-7126-3966|10-6306|

>  id -- int | PRIMARY KEY     
>  name -- varchar(200)   
>  tel -- varchar(20)       
>  businessNumber -- varchar(30)    

<h3>MARKET Table</h3>

|id|name|coverImage|coordinate|status|
|--|----|----------|----------|------|
|20031|이씨네 카페|DEFAULT|ST_GeomFromText('POINT(122.567 212.136)')|end|
|75690|김씨네 햄버거|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EB%A7%A4%EC%9E%A5+%EC%82%AC%EC%A7%84.jpg|NULL|DEFAULT|

>  id -- int | PRIMARY KEY    
>  name --  varchar(200)    
>  coverImage -- varchar(200)   
>  coordinate -- point     
>  status -- varchar(10)  

<h3>MENU Table</h3>

|id|marketID|name|price|description|image|
|--|--------|----|-----|-----------|-----|
|23540697|20031|말차라떼|5100|NULL|DEFAULT|
|59113950|20031|딸기케이크|4700|NULL|DEFAULT|
|90012662|20031|아메리카노|4300|NULL|DEFAULT|
|14003658|75690|감자튀김|3500|진짜 감자로만 튀긴 튀김|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B0%90%EC%9E%90%ED%8A%80%EA%B9%80.jpg|
|40981666|75690|콜라|2000|탄산이 톡톡 터져요|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EC%BD%9C%EB%9D%BC.png|
|64100535|75690|치즈버거|6000|진짜 치즈만으로 만들어진 치즈버거|https://maks-bucket.s3.ap-northeast-2.amazonaws.com/%EC%B9%98%EC%A6%88%EB%B2%84%EA%B1%B0.png|

>  id -- int | PRIMARY KEY      
>  marketID -- int | FOREIGN KEY       
>  name -- varchar(200)       
>  price -- int      
>  description -- varchar(200)     
>  image -- varchar(200)         

<h3>ORDERS Table</h3>

|id|userID|marketID|createdAt|menus|totalPrice|isTakeout|status|
|--|------|--------|---------|-----|----------|---------|------|
|145203|heroes51|20031|2019-10-06 11:10:50|{"23540697": 2, "59113950": 2}|19600|1|end|
|200364|tigers47|75690|2023-12-08 14:53:34|{"14003658": 3, "64100535": 1}|16500|0|ing|

>  id -- int | PRIMARY KEY     
>  userID -- varchar(20) | FOREIGN KEY       
>  marketID -- int | FOREIGN KEY       
>  createdAt -- datetime
>  menus -- json     
>  totalPrice -- int
>  isTakeout -- tinyint
>  status -- varchar(10)


DB 데이터 캡쳐본 넣고~

사용 방법 넣고~

AWS 주소~

라우터~


     . Source code에 대한 설명 / How to build / How to install / How to test 
     . Database or data used / list of open sources used
