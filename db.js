// mongoose.connect("mongodb://localhost:27017/fruitsDB", {
//   useNewUrlParser: true,
// });

// mongoose.set("strictQuery", false);

// const fruitSchema = new mongoose.Schema({
//   name: String,
//   rating: Number,
//   review: String,
// });

// const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Taste Good",
// });

// fruit.save();

const mongoose = require("mongoose");

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
