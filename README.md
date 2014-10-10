#visionary

Views loader plugin for hapi.js. Used to configure a views engine when using the hapi
CLI. This plugin allows configuring the views manager from the CLI manifest which is
a plain JSON file and cannot contain called to `server.views()` or require the rendering
engine.

If you are not loading your views manager from a static JSON manifest file, you probably
don't need this plugin and can just call `server.views()` directly from your code.

```json
{
    "servers": [
        {
            "port": 8080
        }
    ],
    "plugins": {
        "visionary": {
            "engines": { "html": "handlebars" },
            "path": "/where/my/template/file/are/located"
        }
    }
}
```

[![Build Status](https://secure.travis-ci.org/hapijs/visionary.png)](http://travis-ci.org/hapijs/visionary)

Lead Maintainer - [Eran Hammer](https://github.com/hueniverse)
