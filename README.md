# Run demo application

## Install dependencies

`npm install`

## Run applications

`npm start`

- Visit http://localhost:4000/
- To get API response with interactions visit http://localhost:4000/api/interactions

## Run tests for trackingScript

`npx jest trackingScript.test.js`

# Important notes

- Compatibility of code tested in the required browsers (Safari, Firefox, Chrome, Edge) on sanity level and with compatibility tables.
- LocalStorage on client side and mock storage on server side are used for demo purpose. Data should be stored on persistance layer and accessed via API with CRUD methods.

- Improvement 1: consider transforming code fully to newer JS ES6 version and add TypeScript with types. Then add bundling / compiling tooling for browser compatibility.
- Improvement 2: update full unit and integration tests. Due to time limitation only the structure and first function test has been added.
