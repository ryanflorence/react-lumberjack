React Lumberjack
================

Logs `setState` calls across your app for debugging bliss.

![screenshot](./ss.png)

Installation
------------

`npm install react-lumberjack`

Usage
-----

Just include it before you do any rendering with React.

```js
import 'react-lumberjack'
```

or

```js
require('react-lumberjack')
```

or

```xml
<script src="https://npmcdn.com/react-lumberjack@1.0.0"></script>
```

Make sure not to include it in your production build, ofc.

"Time Travel"
-------------

```js
Lumberjack.back()
Lumberjack.forward()
```

This is super hacky, has 8 trillion edge-cases, but I'm finding it
useful for debugging a few states back. If a component is unmounted at
some point, there's no going back.

Consider it a fun proof-of-concept that at least one person (me) finds
useful :P


