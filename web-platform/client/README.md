# jamxio-web-client

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
    MAPBOX_TOKEN=
    GRAPHQL_SERVER_URL=
    GRAPHQL_SERVER_ENDPOINT=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    IDENTITY_POOL_NAME=
    IDENTITY_POOL_ID=
    IDENTITY_POOL_REGION=
    DOCUMENTS_BUCKET_NAME=
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


