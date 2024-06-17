const app = require("./routes/route");
require("dotenv").config();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
