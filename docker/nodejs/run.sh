#! /bin/bash

#Install package
cd srv/nodeProject/current

rm -rf node_modules

npm install
#npm command to use in package.json in script section with command

npm run start
