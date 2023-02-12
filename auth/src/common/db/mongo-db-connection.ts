import mongoose from "mongoose";
import { DatabaseConnectionError } from "@common-ticketing-microservices/common";

class MongoDBConnection {
  async sync() {
    try {
      await mongoose.connect("mongodb://auth-mongodb-service:27017");
      console.log("AUTH SERVICE => Connected to MonogoDB!!!");
    } catch (error) {
      console.log(error);
      throw new DatabaseConnectionError();
    }
  }
}

export default new MongoDBConnection();
