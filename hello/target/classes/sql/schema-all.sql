
select id,name1,name2,name3,name4,name5,menuId,rownum rn from (select id,name1,name2,name3,name4,name5,menuId from Demo order by id )

select id,name1,name2,name3,name4,name5,menuId, rownum rn from(select id,name1,name2,name3,name4,name5,menuId,rownum rn from (select id,name1,name2,name3,name4,name5,menuId from Demo order by id ) f1 where menuId = '1002') f2 where rn between 1 and 3
select count(id) from Demo
select p.*,rownum rn from p_person p order by  id asc;

select p1.*,ROWNUM rn from (select p.*,rownum rn from p_person p order by  id asc) p1 where rn between 1 and 2;
create table P_PERSON
(
    id       NUMBER(38) not null,
    name     VARCHAR2(255),
    password VARCHAR2(255)
);

select * from P_PERSON;
insert into P_PERSON values (1,'娃娃','a');
commit ;

CREATE TABLE fileupload (
        id     number(18),primary key (id),
        filepath   VARCHAR2(255),
        fileName   VARCHAR2(255)
);
insert into fileupload values (1,'a','a');
commit;
select fileupload_squ.nextval from dual
create sequence fileupload_squ start with 1;
drop sequence fileupload_squ;
drop table fileupload;
select * from fileupload;
select fileupload_squ.nextval from dual
select id,fileName,filepath from fileupload order by id asc;




CREATE TABLE Menu (
                      id varchar(255)  NOT NULL ,primary key (id),
                      text varchar(255) DEFAULT NULL,
                      url varchar(255) DEFAULT NULL,
                      /*icon,判断是否为1级,2级,3级,菜单*/
                      icon varchar(255) DEFAULT NULL,
                      parentId varchar(255) DEFAULT NULL
);
create sequence menu_squ start with 1;


delete from Menu;
drop table Menu;
commit ;
drop sequence menu_squ;




select menu_squ.nextval from dual;

/*0是根节点*/
select * from Menu order by id desc ;

insert into Menu values(menu_squ.nextval,'菜单','#','0','0');
insert into Menu values(menu_squ.nextval,'菜单','#','1','2');
insert into Menu values(menu_squ.nextval,'菜单','all.html','2','3');
commit ;



CREATE TABLE Demo (
      id number(18)  NOT NULL ,primary key(id),
      name1 varchar(255) DEFAULT NULL,
      name2 varchar(255) DEFAULT NULL,
      name3 varchar(255) DEFAULT NULL,
      name4 varchar(255) DEFAULT NULL,
      name5 varchar(255) DEFAULT NULL,
      menuId varchar(255) DEFAULT NULL
);
create sequence Demo_squ start with 1;

select Demo_squ.nextval from DUAL;
drop sequence Demo_squ;

select * from Demo where menuId='1001';
select * from Demo where menuId='1002';
select * from Demo;
select id,name1,name2,name3,name4,name5,menuId from Demo  where menuId ='1001' order by id asc;
select id,name1,name2,name3,name4,name5,menuId from (select id,name1,name2,name3,name4,name5,menuId from Demo order by id );

delete from demo where name1 ='bb';
delete from demo where name1 ='dd';
delete from demo where name1 ='cc';
delete from demo where name1 ='ee';
commit ;

drop table Demo;

insert into Demo values(Demo_squ.nextval,'a','b','c','d','e','1001');
insert into Demo values(Demo_squ.nextval,'a','b','c','d','e','1002');
insert into Demo values(Demo_squ.nextval,'a2','b','c','d','e','1002');
insert into Demo values(Demo_squ.nextval,'a3','b','c','d','e','1002');
commit ;


CREATE TABLE Menu1 (
                      id varchar(255)  NOT NULL ,primary key (id),
                      text varchar(255) DEFAULT NULL,
                      url varchar(255) DEFAULT NULL,
                        /*icon,判断是否为1级,2级,3级,菜单*/
                      icon varchar(255) DEFAULT NULL,
                      parentId varchar(255) DEFAULT NULL
);
create sequence menu1_squ start with 1;


delete from Menu1;
drop table Menu1;
commit ;
drop sequence menu1_squ;


select id,name1,name2,name3,name4,name5,menuId from Demo where menuId = '1001';

select menu1_squ.nextval from dual;

/*0是根节点*/
select * from Menu1 order by id desc ;

insert into Menu1 values(menu1_squ.nextval,'菜单2','#','0','0');
insert into Menu1 values(menu1_squ.nextval,'菜单2','#','1','2');
insert into Menu1 values(menu1_squ.nextval,'菜单2','all.html','2','3');
commit ;

create table P_PERSON
(
    ID       NUMBER(38) not null
        primary key,
    NAME     VARCHAR2(255) default NULL,
    PASSWORD VARCHAR2(255) default NULL,
)