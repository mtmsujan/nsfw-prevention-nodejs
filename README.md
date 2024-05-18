# nsfw-prevention-nodejs

This script for nodejs will help create api endpoints to restrict uploading nsfw images in your app

# How to install

1. git clone https://github.com/mtmsujan/nsfw-prevention-nodejs.git

2. cd nsfw-prevention-nodejs

3. npm install

4. node server.js

# API Endpoint

[GET] http://{IP/Hostname}:8080/nsfw?image={image_url}

# CURL Request

curl --location 'http://{ip}/nsfw?image=(image_url_as_parameter)' \
--header 'Authorization: Bearer {secretkey}'
