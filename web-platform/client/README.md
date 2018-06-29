# jamxio-web-client

## Requirements: 

- Node (https://nodejs.org/en/download/)
- Yarn (https://yarnpkg.com/en/docs/install)

## install app and run in dev mode

Install dependencies:
``` bash
$ yarn install
```

Creaete **src/.env** file with mapbox api token, should look like this:
``` bash
MAPBOX_TOKEN=<yourMapboxToken> #without < >
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


