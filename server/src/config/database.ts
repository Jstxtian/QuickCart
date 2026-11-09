// database.ts
// Conects to MongoDB using the mONGO _URI from .env file

import mongoose from "mongoose";
import { env } from "./env";

// STEP 2: connect to mongoDB
// connectionDB() opens the connection to MongoDB with the address from .env .server.ts calls it before the PAI starts.

export const connectDB = async () => {
  const connection = await mongoose.connect(env.mongoUri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

// STEP 3: Create the express app -> server/src/app.ts
