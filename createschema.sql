create table USER (
U_ID varchar(20) not null,
NAME varchar(20) not null,
EMAIL varchar(40) not null,
TEL varchar(20) not null,
POINT int unsigned default 0,
GRADE varchar(10) default 'general',
N_NAME varchar(30) default (U_ID),
C_AT datetime default now(),
GENDER varchar(10),
BIRTH date,
L_CENTER varchar(10),
primary key(U_ID)
) default charset = utf8mb4;

create table MANAGER (
MG_ID int,
NAME varchar(20),
TEL varchar(20),
B_NUM varchar(30),
primary key(MG_ID)
) default charset = utf8mb4;

create table MARKET (
MK_ID int unsigned not null,
NAME varchar(40) not null,
TEL varchar(20) not null,
LCATION varchar(100) not null,
STATUS varchar(10) default 'ing',
PT point,
primary key(MK_ID)
) default charset = utf8mb4;

create table MENU (
NU_ID int not null,
NAME varchar(40) not null,
PRICE int unsigned not null,
SCRIPT varchar(100),
MK_ID int unsigned,
primary key(NU_ID),
foreign key(MK_ID) references MARKET(MK_ID)
on delete cascade
on update cascade
) default charset = utf8mb4;

create table ORDERS (
O_ID int unsigned not null,
MENUS JSON not null,
T_PRICE int unsigned not null,
C_AT datetime default now(),
T_OUT tinyint,
STATUS varchar(10),
U_ID varchar(20),
MK_ID int unsigned,
primary key(O_ID),
foreign key(U_ID) references USER(U_ID)
on delete cascade
on update cascade,
foreign key(MK_ID) references MARKET(MK_ID)
on delete cascade
on update cascade
) default charset = utf8mb4;