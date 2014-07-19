drop table Users;
drop table Group;
drop table User_In_Group;
drop table Rules;

create table Users
(
	uId int NOT NULL AUTO_INCREMENT,
	Username varchar(32) NOT NULL,
	Phone varchar(32) NOT NULL,
	CONSTRAINT pk_uId PRIMARY KEY (uId)
);

create table Groups
(
	gId int NOT NULL AUTO_INCREMENT,
	pId int,
	rId int,
	Groupname varchar(64) NOT NULL,
	Description varchar(256),
	Password varchar(32) NOT NULL,
	CONSTRAINT pk_gId PRIMARY KEY (gId)
);

create table User_In_Group
(
	gId int NOT NULL,
	uId int NOT NULL,
	isAdmin bit NOT NULL,
	CONSTRAINT pk_uId_gId PRIMARY KEY (uId, gId)
);

create table Rules
(
	rId int NOT NULL AUTO_INCREMENT,
	Filename varchar(64) NOT NULL,
	CONSTRAINT pk_rId PRIMARY KEY (rId)
);