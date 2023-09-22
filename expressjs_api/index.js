import express from "express";
import cors from "cors";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";

// Load configuration
try {
  configDotenv();
} catch (e) {
  console.error("Error loading configuration:", e);
  process.exit(1);
}

// Create server
const app = express();
app.use(cors());

// Create database connection
const datasource = new DataSource({
  // type: "sqlite",
  // database: "./data/northwind.db",
  type: "test",
  host: "test",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  schema: "public",
});
datasource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});
const toolkit = new SqlToolkit(db);
console.log(datasource, "datasource.......", db, "db........", toolkit);
// Create OpenAI model
const model = new OpenAI({
  // openAIApiKey: "sk-TeT3BlbkFJ1yTeRTYj65DwWolZOMnZ",
  temperature: 0,
});
const executor = createSqlAgent(model, toolkit);

// Route handler
app.get("/api/query", async (req, res) => {
  const prompt = req.query.prompt;

  console.log("prompt: " + prompt, "executor");

  let response = {
    prompt: prompt,
    sqlQuery: "",
    result: [],
    error: "",
  };

  try {
    const result = await executor.call({ input: prompt });

    console.log("result: " + result, "result");
    result?.intermediateSteps.forEach((step) => {
      if (step.action.tool === "query-sql") {
        response.prompt = prompt;
        response.sqlQuery = step.action.toolInput;
        response.result = JSON.parse(step.observation);
      }
    });

    console.log(
      `Intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`
    );

    res.status(200).json(response);
  } catch (e) {
    console.log(e + " " + "my error message");
    response.error = "Server error. Try again with a different prompt.";

    res.status(500).json(response);
  }

  await datasource.destroy();
});

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
