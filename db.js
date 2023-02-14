const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(process.env.DB, connectionParams);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database");
  }
};
