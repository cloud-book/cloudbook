# Cloud Book #
## Installation ##

You need install nodejs : 
```sh
sudo apt-get install nodejs
```
Download nwjs ( https://github.com/nwjs/nw.js ) and install . You need nwjs >= 0.11.5

clone cloudbook and download depends
```sh
git clone https://github.com/raurodse/cloudbook.git
cd cloudbook/src/
npm install
```

## Launch ##

Command nw is node-webkit launcher.

```sh
nw cloudbook/src
```

## Update doc ##
You need jsdoc (npm install -g jsdoc)
```sh
jsdoc src -c conf.json 
```
