// <group Name="HVZ_TEST!" Description="Humans vs Zombies game" imageUrl="http://www.humansvszombies.org/hvzlogo.jpg" password="hellofriend" isPublic="1" isVisible="0">
//     <group Name="Humans" Description="The human players" imageUrl="http://img3.wikia.nocookie.net/__cb20101220195949/spore/images/0/02/Hires_human.jpg" password="asdf" isPublic="0" isVisible="1" />
//     <group Name="Zombies" Description="The zombies" imageUrl="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGgRVdmVc0IMf8owY_KJWldLkksuxRsVPiFNLn_pU8oqGKacsj" password="fdsa" isPublic="0" isVisible="1" />
// </group>

var sqlExten = require('../sql');

game =
{
    "Name": "HumansVsZombies",
    "Description": "A cool game",
    "ImageUrl": "http://www.humansvszombies.org/hvzlogo.jpg",
    "Password": "hellofriend",
    "isPublic": 1,
    "isVisible": 0,
    "children": [
        {
            "Name": "Humans",
            "Description": "The living",
            "ImageUrl": "http://img3.wikia.nocookie.net/__cb20101220195949/spore/images/0/02/Hires_human.jpg",
            "Password": "asdf",
            "isPublic": 0,
            "isVisible": 1,
            "children": []
        },
        {
            "Name": "Zombies",
            "Description": "Belated",
            "ImageUrl": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGgRVdmVc0IMf8owY_KJWldLkksuxRsVPiFNLn_pU8oqGKacsj",
            "Password": "fdsa",
            "isPublic": 0,
            "isVisible": 1,
            "children": []
        },
    ]
};

function insertIntoDb(item, sql){
    console.log(item);
}

insertIntoDb(game, sqlExten);