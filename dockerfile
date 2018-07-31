from node:8-slim

copy . /var/p1

workdir /var/p1

run npm install

expose 3000

entrypoint ["npm", "start"]