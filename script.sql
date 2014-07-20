
UPDATE Users SET Latitude =( Latitude + (0.5 - RAND())/50000), Longitude = (Longitude + (0.5 - RAND())/50000)  WHERE (Latitude!=NULL) AND (Longitude!=NULL) AND (uId <= 5)

