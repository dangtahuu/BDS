const mongoose = require("mongoose");

// const uri = `mongodb://${process.env.DB_HOST||process.env.DB_PORT}:27017/${process.env.DB_NAME}`
const uri = `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`

async function initDbConnection() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

        .then(() => {
            console.log("Connect database successfully!");
        })
        .catch(err => {
            console.log(err);
        })

};

module.exports = {
    initDbConnection
};