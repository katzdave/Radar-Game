#!/bin/sh


for i in `seq 1 60`;
do
  mysql -h nextres.mit.edu -u alpha -p"cats" radar < script.sql
  sleep 0.92s #give it some breathing room at the end
done



