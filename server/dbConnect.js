import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Connection Error:", error);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
  });
};

export default dbConnect;
