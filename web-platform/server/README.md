# jamxio-web-server

## Requirements: 

- Node (https://nodejs.org/en/download/)
- Yarn (https://yarnpkg.com/en/docs/install)

## install app and run in dev mode

Install dependencies:
``` bash
$ yarn install
```

Creaete **src/.env** file with all tokens and url, should look like this:
``` bash
APOLLO_ENGINE_KEY=
PORT=4000
MONGODB_ATLAS_URI=
MONGOOSE_DEBUG=

```



Run the App in dev mode:
``` bash
$ yarn start:dev
```

Remote Redux DevTools
``` bash
http://remotedev.io/local/
```

## Build and pack the App
To build the App:
``` bash
$ yarn prestart:prod
```

