import mongoose from "mongoose";

let isConnected = false; // track the connection status

export async function connect() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
}

// export async function connect() {
//   try {
//     // '!' means i know better. TS throws a warning without it.
//     mongoose.connect(process.env.MONGO_URI as string);
//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully!");
//     });

//     connection.on("error", (err) => {
//       console.log(
//         "MongoDB connection error. Please make sure MongoDB in running.",
//         err
//       );
//       process.exit();
//     });
//   } catch (error) {
//     console.error("Something went wrong!");
//     console.error(error);
//   }
// }
