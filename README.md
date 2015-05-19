# Cloud Book #
## Installation ##

You need install nodejs : 
```sh
sudo apt-get install nodejs
```

clone cloudbook and download depends
```sh
git clone https://github.com/cloud-book/cloudbook.git
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

To run the test do:
```
    $ mocha
```

