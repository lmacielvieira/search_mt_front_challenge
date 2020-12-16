# Lucas Maciel - Searchmetrics test

S Searchmetrics Front end project


## Getting Started

These instructions will get you a copy of the project up and 
running on your local machine for development and testing 
purposes. See deployment for notes on how to deploy the 
project on a live system.

*** This project used my personal react boilerplate (lucas maciel). As no 
design was given, i used some parts of a previous project, in order to
have a nice user experience.

### Prerequisites and main libs

[react](https://reactjs.org/) (v16.13.1)

[node](https://nodejs.org/en/download/) (v14.14.0)

[npm](https://www.npmjs.com/get-npm) (v6.14.8)

[redux](https://github.com/reduxjs/redux) * centralized state 
(persistence kept with redux-persist)

[cypress](https://www.cypress.io/) * end-to-end testing 

[jest](https://github.com/facebook/jest) * component testing

[enzyme](https://github.com/enzymejs/enzyme)  * component testing interactions

[less](http://lesscss.org/)  * extension for CSS

[husky](https://github.com/typicode/husky#readme) * commit and push control

[antd](https://ant.design/docs/react/introduce) * UI library with useful
components and layout guidelines

[sentry](https://sentry.io/) * Error tracking


### Project structure


```
config * overall webpack configs
cypress * end to end tests
puclic * static html files and div mounting point
scripts * scripts for running and building
src * main js folder
    └── index.js * project starting point
    ├── assets
        ├── animations * lootie animation files
        ├── fonts * fonts used
        └── images * image assets 
    └── components * components used in the project
        └── SampleComponent 
              ├──  __tests__ * component tests with jest + enzyme
              ├──  index.js
              └──  style.less
    └── pages * pages used in the project
        ├── SamplePage 
        │      ├──  index.js
        │      └──  style.less
        └── Manager * router handler
    └── redux
    └── services * backend services connectors
    └── settings * common project configs
        ├── pt-br * portuguese strings used in the project
        │      ├──  components
        │      └──  pages
        ├── images.js * assets loading
        ├── index.js * mounting point
        ├── keys.js * keys used in the project i.e maps
        ├── mock.js * mock samples
        └── routes.js * routes used in the project
    └── styles * global styles
        ├── antd  * antd less common overwritten variables and styles
        ├── cs * clicksign less common global variables and styles
        └── globalStyle.less * mounting point of global styles
    └── utils * common used functions
```

#### Error tracking
In case of any error, an animation page will show and the error will
be reported to the Sentry application monitoring. You can restart the
application by just refreshing the page.



### Create Page

```
npm run cs:createPage -- -name "PAGENAME"
```

### Create Component

```
npm run cs:createComponent -- -name "COMPONENTNAME"
```


### Installing

A step by step series of examples that tell you how to get a
 development env running

1 - Clone the project

```
git clone <project_url>
```

2 - Enter the project folder

```
cd <project_folder>
```


3 - Install project libraries


```
npm install
```



4 - Run the project


```
npm start
```


# Important note
The front project is running with the api url http://localhost:3000/. If
you run the back server on another port, please change the url at
src/settings/routes.js


## Running the tests


### Jest + enzyme
Simple snapshot and component tests are done using Jest + Enzyme. Each 
component has a folder __tests__ with its snapshot and component 
tests. To run the jest tests 
run:

```
npm run test
```

### E2E Integration tests - Cypress

The project have few integration tests, which checks the 404 page and
the process of adding and deleting a contact. To run the integration test:

```
npx  cypress open
```

The interface from cypress will open. You can run the test and
check the result



## Build

```
npm run build
```
### Running on a http server

To serve the build in a server, just copy the generated content 
from the build folder to the http server service. You can also try the build
locally using the package https://www.npmjs.com/package/http-server




## Versioning
Versioning is done by a internal process.

### git
In order to maintain the project best practices and prevent bugs. Husky is 
set to run eslint (airbnb style) fixes, maintain prettier style
and run the tests before commit and push.


## Authors

[Lucas Maciel Vieira](https://www.linkedin.com/in/lucas-vieira-015b94a5/)

## License

This project is private, any usage of its content or copy without 
authorization will result in a legal process of the related parts


