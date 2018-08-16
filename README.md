# react-typescript-devstack

- Starter stack static sites

* [Node](https://nodejs.org/en/) - v8.11.2
* [Yarn](https://github.com/yarnpkg/yarn) - v1.7.0

## Used libraries

* [React](https://facebook.github.io/react/) (JS view library)
* [Webpack](https://webpack.github.io/) (Builder)
* [HappyPack](https://github.com/amireh/happypack) (Builder-plugin)
* [Redux](https://github.com/reactjs/redux) (Application layer)
* [i18next](https://www.i18next.com/) (For internalization)
* [TypeScript](https://www.typescriptlang.org/) (For static typing, classes and interfaces)
* [Axios](https://github.com/axios/axios) (Promise based HTTP client)
* [React router](https://github.com/ReactTraining/react-router) (Declarative routing for React)
* [Redux-saga](https://github.com/redux-saga/redux-saga) (Side effect managing library)
* [Lodash](https://github.com/lodash/lodash) (Utility library)

## Available commands

* `yarn install` - install all necessary dependencies
* `yarn start` - start local dev server
* `yarn build` - build production application
* `yarn jest` - for running tests
* `yarn prettier` - for prettier auto cleanup

## App structure

Located in /src directory

* **/lib** (local libraries, custom scripts)
* **/locale** (JSON language translates, file per language)
* **/view** (view part of application, ReactJS components)
* **/state** (application part of application)
* **/stylesheet** (global styslesheets, MUI-creator)
* **/utils** (custom functions)
* **/index.tsx** (main application file)

Stack configuration files

**/.babelrc** - configuration file for Babel 6
**/.eslintrc** - configuration file for ESLint
**/.tslintrc** - configuration file for TSLint
**/tsconfig.json** - configuration file for TypeScript
**/.webpack.conf.js** - configuration file for Webpack 4

## Tests

- Tests is running in * [Jest](https://facebook.github.io/jest/) (JavaScript testing framework)
- Testing utility * [Enzyme](http://airbnb.io/enzyme/) (JavaScript testing utility)

- ***Hint:*** when you're developing or updating components, do it with background task "yarn jest --watch" it will watch files you modify and re-run tests for you
