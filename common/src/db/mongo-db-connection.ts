import mongoose from "mongoose";
import DatabaseConnectionError from "../errors/database-connection-error";

class MongoDBConnection {
  async sync() {
    try {
      if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
      await mongoose.connect(process.env.MONGO_URI!);
      console.log("Connected to MonogoDB!!!");
    } catch (error) {
      console.log(error);
      throw new DatabaseConnectionError();
    }
  }
}

export default new MongoDBConnection();
