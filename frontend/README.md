# django-business-logic 
###  (frontend part)

### Installation

 requires [Node.js](https://nodejs.org/) v4+  and npm v3+
Install the dependencies and devDependencies

```sh
$ npm install
```

###  webpack server
```bash
# development
$ npm run server:dev:hmr
# production
npm run build:prod
npm run server:prod
```

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

### run Protractor (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

### build Docker
```bash
npm run build:docker
```

### Tech
The project use following frameworks, libs and repositories:
-  [Angular2](https://angular.io/) 
-  [ngrx](https://github.com/ngrx/ngrx.github.io) - Reactive Extensions for Angular 2
-  [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)
-  [closure-library.d.ts](https://github.com/teppeis/closure-library.d.ts)


