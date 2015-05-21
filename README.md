# Cloud Book #

Cloudbook es una herramienta de autor enfocada tanto al contenido como a la maquetacion. 

## Run ##

Actually, you can install Cloudbook on Ubuntu by launchpad ppa:llxdev/trusty. On the other hand, you can download source and run while we work on installer.

### PPA

```sh
    sudo add-apt-repository ppa:llxdev/trusty
    sudo apt-get update
    sudo apt-get install cloudbook
```

### Source 

You need install nodejs : 
```sh
    sudo apt-get install nodejs
```
In addition, you need install gulp

```sh
    sudo npm install gulp -g
```

clone cloudbook and download depends
```sh
    git clone https://github.com/cloud-book/cloudbook.git
    cd cloudbook
    npm install && cd src && npm install && cd ..
```
#### Launch
You must be on cloudbook folder
```sh
    gulp run
```

This process download nwjs on cache folder. This will only happen first time.
To work fine, you must create folder /usr/share/cloudbook/plugins/ and copy inside libpepflashplayer.so . You can get this file installing google-chrome and coping from /opt/google/chrome/PepperFlash/libpepflashplayer.so