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
        }
    ]
};

function insertIntoDb(item, sql){


    function expand(rId){
        item.gId = rId;
        var cnt = rId;

        function exp(parent){
            for(var i=0; i<parent.children.length; i++){
                var c = parent.children[i];
                console.log(c);
                sql.createSubGroup(console.log, parent.gId, c.Name, c.isPublic, c.isVisible, -1, c.ImageUrl, rId)
                c.gId = ++cnt;
                exp(c);
            }
        }

        exp(item);
    }
    sql.createRootGroup(expand, item.Name, item.isPublic, item.isVisible, 0, item.ImageUrl);
}

insertIntoDb(game, sqlExten);