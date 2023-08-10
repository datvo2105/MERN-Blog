const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_CON)
    .then(() => console.log("Success: Database is connecting... "))
    .catch((error) => console.log("Error: Can't connect database.\n" + error));
};
