mydbg
=====

Simple wrapper of nodejs [debug module](https://www.npmjs.com/package/debug)  with debug level control.

Install
-------

```sh
npm install mydbg
```

Usage
------

```javascript

const dbg = require('mydbg')('app');

dbg.info('app starting...');

try {
    ...
}catch(ex){
    dbg.err(ex.message);
}

```

Levels
-------

There are 5 levels of debug messages supported:

- trace: detailed messages for development

- info: generic information messages

- warn: something abnormal detected, but app can still run

- err: error detected, but app can still run

- fatal: error detected, app must terminate

The importance of levels are sorted as following:

```sh
trace < info < warn < err < fatal
```

Output Control
--------------

The output of debug messages can be controlled by its level in DEBUG environment variable

```sh
DEBUG=app.warn,app.err,app.fatal
```

or simply use '+' to specify that all messages of the same or high levers are included:

```sh
DEBUG=app.warn+
```

To enable warn messages of all app modules:

```sh
DEBUG=*.warn
```

To enable messages starts from warn level:

```sh
DEBUG=*.warn+
```

To enable messages for multiple moduels:

```sh
DEBUG=app.warn+,srv.err+,-ui.*
```

Please refer to [debug module](https://www.npmjs.com/package/debug) for *Wildcards*

Methods
--------

- trace() / info() / warn() / err() / fatal()

They are message output api for each debug level. please refer to [debug module](https://www.npmjs.com/package/debug) for *Formatters*

```js

const dbg = require('mydbg')('srv');

dbg.trace('server starts');
```

- throw_err(message)

outputs the message as *err* level and throw an *Error* instance.

```js
try {
    ...
}catch(ex){
    dbg.throw_err(ex.message);
}
```