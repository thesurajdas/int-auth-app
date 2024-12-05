import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_DB);
  mongoose.connection.on("connection", () => {
    console.log("Database Connected!");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Connnection Error:", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Connnection Disconnected!");
  });
};

export default dbConnect;
