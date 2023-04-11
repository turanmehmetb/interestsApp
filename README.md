
## Description

A simple fullstack application that is designed to showcase my interests and provide a fun scoring system among them. 

There are 3 screens; Mainpage, Selection page and Popularities page.

* Mainpage shows which interests are included in the system.
* Selection page shows 2 random interests and expects a selection from the user. The selected interest gains 1 point.
* Popularities page presents most&least popular intersts by day, month and year. It also shows all interests' scores and allows users to export data to pdf.

## Development

* This is a monorepo including the API and frontend of the project. 

* Backend of this application is developed with Express and ES6 is used. It is transpiled to ES5 via Babel. API is responsible of serving the data and the images. There is no external dbms for this application, therefore filesystem is used to store data. sendfile method of express api is used to serve images, it also includes a built-in cache control mechanism. All data models and API endpoints are showed below. 

* The frontend of the project is built using Angular13, with Typescript used to implement a strictly-typed approach. To create a responsive design that enhances the mobile user experience, theming and styling were developed with Primeng and Tailwind. Throughout the development process, the application is tested using Jasmine.

## Installation

```bash
$ cd api && npm i && cd ../interests && npm i
```

## Running the app

```bash
# development for api
$ cd api && npm run start:dev

# watch mode for api
$ cd api && npm run start:dev

# development for frontend
$ cd interests && npm run start

# watch mode for frontend
$ cd interests && npm run start --watch

```

## Test

```bash
# unit tests are only available for frontend
$ cd interests && npm run test

```

## Dependencies

* Node@14^
* Angular@13^
* Primeng@13^
* Typescript@4^
* Tailwind@3^
* Express@8^

## Interests API

**InterestModel;**
```
  id: string
  name: string
  path: string
  description: string
  score: number
```
**ScoreModel;**
```
  id: string
  interestId: string
  epoch: number
```
**Methods;**

* GET /interests
* GET /interests/{dateType}
* GET /scores
* GET /scores/getByDate/{dateType}
* POST /scores/{id}
* GET /getImage/{path}



