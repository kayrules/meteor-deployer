# meteor-deployer
Meteor-Redhat packager (Experimental)


# build docker
docker build -t kayrules/playroom:base .

# Sample repo structure:

```
$ pwd
/opt/mobile-playroom/
$ tree .
.
|-- build.sh
|-- package
|   |-- MeteorApp.tar.gz
|   `-- bundle
```

# Extract bundle
```
$ cd /opt/mobile-playroom/package
$ tar -xzf MeteorApp.tar.gz
$ ls -la
total 9860
drwxr-xr-x. 3 khairul khairul       42 Jul  4 18:27 .
drwxr-xr-x. 4 root    root        4096 Jul  4 18:25 ..
-rw-r--r--. 1 khairul khairul 10091392 Jul  3 15:32 MeteorApp.tar.gz
drwxr-xr-x. 4     502 games        101 Jul  3 15:31 bundle
```

# Example script to build the docker image from the server:

script name: /opt/mobile-playroom/build.sh
```
#!/bin/bash

ROOT_URL=http://<ip_address>
MONGO_URL=mongodb://<ip_address>:<mongodb_port>/db_name
APPNAME=mobile-playroom
BUNDLEPATH=/opt/mobile-playroom/package
PORT=8008

docker rm -f $APPNAME

docker run -d \
    --restart=always \
    -e ROOT_URL=$ROOT_URL \
    -e MONGO_URL=$MONGO_URL \
    -v $BUNDLEPATH:/bundle \
    -p $PORT:80 \
    --name=$APPNAME \
    kayrules/playroom:rebuild
```
