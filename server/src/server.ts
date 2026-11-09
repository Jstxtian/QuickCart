// server.ts
// The starting point of the API: connect to MongoDB, then start listening for requests.
import { connectDB } from "./config/database";
import { env } from "./config/env";
import app from "./app";
// STEP 6: Start the server
// The starting point: connect to MongoDB first, then start istening on the port, If the database can't be reached, show the error and stop

const startServer = async () => {
  try {
    await connectDB(); // uses MONGO_URI from the .env file

    app.listen(env.port, () => {
      console.error(`QuickCart API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.log("Could not connect to MongoDB:", (error as Error).message);
    process.exit(1);
  }
};

startServer();

// Step 7 (The category model) -> server/src/model/Category.ts
