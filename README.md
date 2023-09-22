# Table Of Contents

- [Chat to your database](#chat-to-your-database)
  - [Tech Features](#tech-features)
  - [Installing the app](#installing-the-app)
  - [Running the app](#running-the-app)
  - [Examples](#examples)
    - [Sample database SQLite](#sample-database-sqlite)
      - [See it in action](#see-it-in-action)
    - [Sample database PostgreSQL](#sample-database-postgresql)
      - [See it in action](#see-it-in-action-1)
  - [Follow Up](#follow-up)

# Chat to your database

Natural language querying allows users to interact with databases more intuitively and efficiently. By leveraging the power of LangChain, SQL Agents, and OpenAI’s Large Language Models (LLMs) like ChatGPT, we have created an application that enables users to query databases using natural language

This is an experimental app to test the abilities of LLMs to query SQL databases using [SQL Agents]() provided by Langchain.
To use it, you should add your OPENAI_API_KEY to the .env file in api folder.

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Tech Features

- Next js --> Frontend
- Express API / Nest API --> Backend
- Sqlite / Postgres --> Backend
- Open AI LLM Model with Langchain Agent --> Generative AI

## Installing the app

```bash!
cd api
npm install
```

```bash
cd client
npm install
```

## Running the app

```bash
/express-api
nodemon or npm run start
/client
npm run dev
```

#### See it in action

https://github.com/Syed007Hassan/NextJs-Langchain-Agents-SQL/assets/104893311/2616a2b5-0512-47f0-8271-014a6d243213

## Follow Up

**Currently I have set SQLite and PostgreSQL connections only, but using TypeORM you can set any Database. To further extend this project, fork this repo and make PRs.**
