use radar;
drop table Users;
drop table Groups;
drop table User_In_Group;
drop table Rules;

create table Users
(
	uId int NOT NULL AUTO_INCREMENT,
	Username varchar(32) NOT NULL,
	Phone varchar(32) NOT NULL,
	Latitude double,
	Longitude double,
	Accuracy double,
	LastUpdate DATETIME,
	CONSTRAINT pk_uId PRIMARY KEY (uId)
);

insert into Users (Username, Phone)
	values ('Phillip', '1234567890');

insert into Users (Username, Phone)
	values ('Ante', 'lolfuckyou');

create table Groups
(
	gId int NOT NULL AUTO_INCREMENT,
	pId int,
	Groupname varchar(64) NOT NULL,
	Description varchar(256),
	Password varchar(32),
	isPublic varchar(32) NOT NULL,
	CONSTRAINT pk_gId PRIMARY KEY (gId)
);

insert into Groups (Groupname, isPublic)
	values ('humans vs zombies',1);

insert into Groups (pId, Groupname, isPublic)
	values (1, 'humans',0);

insert into Groups (pId, Groupname, isPublic)
	values (1, 'zombies',0);

create table User_In_Group
(
	gId int NOT NULL,
	uId int NOT NULL,
	isAdmin bit NOT NULL,
	CONSTRAINT pk_uId_gId PRIMARY KEY (uId, gId)
);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,1,0);

create table Rules
(
	rId int NOT NULL AUTO_INCREMENT,
	Filename varchar(64) NOT NULL,
	CONSTRAINT pk_rId PRIMARY KEY (rId)
);

SELECT u.uId, u.Username, u.Phone, u.Latitude, u.Longitude, u.Accuracy, u.LastUpdate
FROM Users u
INNER JOIN User_In_Group ug
ON u.uId = ug.uId
WHERE ug.gId = 1; 