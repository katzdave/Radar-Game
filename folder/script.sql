UPDATE Users SET Latitude =( Latitude + (0.5 - RAND())/50000), Longitude = (Longitude + (0.5 - RAND())/50000)  WHERE uId <= 5
