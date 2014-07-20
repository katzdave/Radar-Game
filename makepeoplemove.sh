#!/bin/sh


for i in `seq 1 60`;
do
  mysql -h nextres.mit.edu -u alpha -p"cats" radar
  sleep 0.9s #give it some breathing room at the end
done



