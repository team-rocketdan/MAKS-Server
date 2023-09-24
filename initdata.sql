insert into USER values
('heroes51', 'Lee Jung-Hoo', 'heroes51@gmail.com', '010-3194-7649', 510, 'gold', 'hoopangman', '2020-08-12 12:12:17', 'man', '1998-08-20', 'kakao'),
('tigers47', 'Na Sung-Bum', 'tigers47@gmail.com', '010-1123-4569', default, default, default, default, null, null, null);

insert into MANAGER values
(456661, 'Ko Hyeong-Wook', '010-5410-4658', '26-1673'),
(988106, 'Sim Jae-Hak', '010-7126-3966', '10-6306');

insert into MARKET values
(20031, 'A Cafe', '010-9410-7620', 'Incheon', 'end', ST_GeomFromText('POINT(122.567 212.136)')),
(75690, 'B burger', '010-7784-1065', 'Seoul', default, null);

insert into MENU values
(23540697, 'malcha latte', 4500, 'myfavorite', 20031),
(14003658, 'deri burger', 3300, null, 75690),
(64100535, 'cup ramyeon', 1000, null, 75690);

insert into ORDERS values
(145203, json_object('list', json_array('a', 'b', 'c')), 25400, '2019-10-06 11:10:50', 1, 'ing', 'heroes51', 20031),
(200364, json_object('list', json_array('d', 'e', 'f')), 16000, default, 0, 'end', 'tigers47', 75690);