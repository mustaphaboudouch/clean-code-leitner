# Système Leitner

## Project Description

### DDD diagram

<img width="629" alt="Capture_decran_2024-02-20_a_21 39 13" src="https://github.com/mustaphaboudouch/clean-code-leitner/assets/64332287/2f913c3a-694f-4059-a641-76a4189c1e29">

### Hexagonal diagram

<img width="654" alt="Capture_decran_2024-02-20_a_21 39 28" src="https://github.com/mustaphaboudouch/clean-code-leitner/assets/64332287/11f3745f-45ec-4423-9837-b035cb21a0a2">


## Technologies we used

### Backend

- [NodeJS](https://nodejs.org/) with [ExpressJS](https://expressjs.com/) for the api
- [json-server](https://github.com/typicode/json-server/tree/v0) as fake database

### Frontend

- [ReactJS](https://react.dev/)
- [Tanstack Router](https://github.com/TanStack/router) for routing
- [Tanstack Query](https://github.com/TanStack/query) for fetching data

## Project installation

### Backend

```bash
cd api
npm install
npm run db    # in the first terminal, to run the fake DB
npm run dev   # in the second terminal, to run the application
npm run test  # to test the application
```

### Frontend

```bash
cd front
npm install
npm run dev   # to run the application
```
