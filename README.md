# ReadShip

LA Hacks 2020 project. Built with @rconrardy

## Table of Contents
1. [Developer Setup](#Developer-Setup)
2. [Running & Testing Locally](#Running-&-Testing-Locally)
3. [Libraries & Dependencies](#Libraries-&-Dependencies)

## Developer Setup
** Note: This setup requires a bash terminal, if you are using Windows we recommend using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
```
$ python3 -m venv env
$ source env/bin/activate
$ pip install --upgrade pip setuptools wheel
$ pip install -r requirements.txt
$ nodeenv --python-virtualenv
$ source env/bin/activate
$ npm install .
$ npm install -g sass
```

## Running & Testing Locally
1st terminal: Run locally using Flask development server
```
$ ./bin/run.sh
```
2nd terminal: Test POST request locally using curl or test on server by changing 'local' to 'server'
```
$ ./bin/test_local.sh
```

## Frontend Development
1st terminal: Watch React files during development (DOM manipulation)
```
$ npm run-script watch
```
2nd terminal: Watch Sass files during development (style)
```
$ sass --watch summarize/@sass:summarize/static/css
```

## Libraries & Dependencies
- ### Flask
    Micro web framework written in Python
- ### Natural Language Toolkit (NLTK)
    Leading platform for building Python programs to work with human language data
