// Import File
const app = require("./app");
const connectDB = require("./config/DB");

// listen server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  // MongoDB Connection
  await connectDB();
  console.log(`Server is Running at http://localhost:${PORT}`);
});
