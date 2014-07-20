use radar;
drop table Users;
drop table Groups;
drop table User_In_Group;
drop table Rules;

create table Users
(
	uId int NOT NULL AUTO_INCREMENT,
	fbId varchar(32) NOT NULL UNIQUE,
	Username varchar(32) NOT NULL,
	Latitude double,
	Longitude double,
	Accuracy double,
	LastUpdate DATETIME,
	CONSTRAINT pk_uId PRIMARY KEY (uId)
);

insert into Users (Username, fbId)
	values ('Phillip', '10204104201666194');

insert into Users (Username, fbId)
	values ('Ante', 'lolfuckyou');

create table Groups
(
	gId int NOT NULL AUTO_INCREMENT,
	pId int,
	Level int NOT NULL,
	Groupname varchar(64) NOT NULL,
	Description varchar(256),
	ImageUrl varchar(256),
	Password varchar(32),
	isPublic bit NOT NULL,
	isVisible bit NOT NULL,  
	CONSTRAINT pk_gId PRIMARY KEY (gId)
);

insert into Groups (Groupname, isPublic, isVisible, Level)
	values ('humans vs zombies', 1, 0, 0);

insert into Groups (Groupname, isPublic, isVisible, Level)
	values ('field trip planner', 1, 0, 0);

insert into Groups (pId, Groupname, isPublic, isVisible, Level)
	values (1, 'humans', 0, 1, 1);

insert into Groups (pId, Groupname, isPublic, isVisible, Level)
	values (1, 'zombies', 0, 1, 1);

create table User_In_Group
(
	gId int NOT NULL,
	uId int NOT NULL,
	isAdmin bit NOT NULL,
	CONSTRAINT pk_uId_gId PRIMARY KEY (uId, gId)
);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,1,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (2,1,0);

create table Rules
(
	rId int NOT NULL AUTO_INCREMENT,
	Filename varchar(64) NOT NULL,
	CONSTRAINT pk_rId PRIMARY KEY (rId)
);
