DROP SCHEMA IF EXISTS `testdb`;
CREATE SCHEMA `testdb` DEFAULT CHARACTER SET utf8 ;
use testdb;
create table Member (
        id bigint not null auto_increment,
        bookNum varchar(255),
        borrower varchar(255),
        name varchar(255),
        uid varchar(255),
        bookFloor int default 0,
        bookcmp int default 1,
        primary key (id)
    );

insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('300','유종욱','유니티교과서','C5 F3 AF 75', 1, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('400','차은우','디자인 패턴','AB W3 AF 24', 1, 0);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('200','서빈','알고리즘구조','HT F3 JU 75', 1, 0);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('100','김민','게임기획의 모든것','HQ F3 KT H5', 1, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('300','유종욱','유니티교과서','C5 F3 AF 75', 1, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('400','차은우','디자인 패턴','AB W3 AF 24', 1, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('200','서빈','알고리즘구조','HT F3 JU 75', 1, 1);

insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('300','유종욱','유니티교과서','C5 F3 AF 75', 2, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('400','차은우','디자인 패턴','AB W3 AF 24', 2, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('200','서빈','알고리즘구조','HT F3 JU 75', 2, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('100','김민','게임기획의 모든것','HQ F3 KT H5', 2, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('300','유종욱','유니티교과서','C5 F3 AF 75', 2, 0);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('400','차은우','디자인 패턴','AB W3 AF 24', 2, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('200','서빈','알고리즘구조','HT F3 JU 75', 2, 1);

insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('300','유종욱','유니티교과서','C5 F3 AF 75', 3, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('400','차은우','디자인 패턴','AB W3 AF 24', 3, 0);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('200','서빈','알고리즘구조','HT F3 JU 75', 3, 0);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('100','김민','게임기획의 모든것','HQ F3 KT H5', 3, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('300','유종욱','유니티교과서','C5 F3 AF 75', 3, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('400','차은우','디자인 패턴','AB W3 AF 24', 3, 1);
insert into member(bookNum,borrower,name,uid, bookFloor, bookcmp) values ('200','서빈','알고리즘구조','HT F3 JU 75', 3, 0);

select * from member;