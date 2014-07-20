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

insert into Users (Username, fbId, Latitude, Longitude)
	values ('Captain America', '34398498398492','37.7862904','-122.40535219999998');

insert into Users (Username, fbId, Latitude, Longitude)
	values ('Captain Falcon', '39394823948923','37.7860904','-122.40535419999998');

insert into Users (Username, fbId, Latitude, Longitude)
	values ('Captain Crunch', '39940394093094','37.7862904','-122.40535419999998');

insert into Users (Username, fbId, Latitude, Longitude)
	values ('Captain Obvious', '4523423423423423','37.7860904','-122.40535219999998');

insert into Users (Username, fbId, Latitude, Longitude)
	values ('Captain Hook', '3994039434', '37.7861904','-122.40535319999998');

create table Groups
(
	gId int NOT NULL AUTO_INCREMENT,
	pId int,
	rId int NOT NULL,
	Level int NOT NULL,
	Groupname varchar(64) NOT NULL,
	Description varchar(256),
	ImageUrl varchar(256),
	Password varchar(32),
	isPublic bit NOT NULL,
	isVisible bit NOT NULL,  
	CONSTRAINT pk_gId PRIMARY KEY (gId)
);

insert into Groups (Groupname, isPublic, isVisible, Level, ImageUrl, rId)
	values ('humans vs zombies', 1, 0, 0, 'http://humansvszombies.org/images/logo.jpg',1);

insert into Groups (Groupname, isPublic, isVisible, Level, rId)
	values ('field trip', 1, 0, 0, 2);

insert into Groups (pId, Groupname, isPublic, isVisible, Level, ImageUrl, rId)
	values (1, 'humans', 0, 1, 1, 'http://fc05.deviantart.net/fs44/f/2009/115/b/9/My_stick_person_by_xIIStrawberriesIIx.png',1);

insert into Groups (pId, Groupname, isPublic, isVisible, Level, ImageUrl, rId)
	values (1, 'zombies', 0, 1, 1, 'http://foxfiredev.net/wp-content/uploads/2014/03/Zombie.jpg',1);

insert into Groups (Groupname, isPublic, isVisible, Level, rId)
	values ('random group', 1, 0, 0, 5);

create table User_In_Group
(
	gId int NOT NULL,
	uId int NOT NULL,
	isAdmin bit NOT NULL,
	CONSTRAINT pk_uId_gId PRIMARY KEY (uId, gId)
);

insert into User_In_Group (gId, uId, isAdmin)
	values (2,1,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (3,1,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (3,2,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (3,3,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (3,4,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (3,5,0);

/* for demo, add users into group */
insert into User_In_Group (gId, uId, isAdmin)
	values (1,6,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,7,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,8,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,9,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,10,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,11,0);

insert into User_In_Group (gId, uId, isAdmin)
	values (1,12,0);
create table Rules
(
	rId int NOT NULL AUTO_INCREMENT,
	Filename varchar(64) NOT NULL,
	CONSTRAINT pk_rId PRIMARY KEY (rId)
);

-- DELETE ug FROM User_In_Group ug 
-- INNER JOIN Groups g 
-- ON g.gId = ug.gId 
-- WHERE ug.uId = 1 AND g.rId = 1;

-- INSERT into User_In_Group (gId, uId, isAdmin) 
-- VALUES (4,1,0);
