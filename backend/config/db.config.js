require('dotenv').config()

const mongoose = require('mongoose')
const db_url = process.env.MONGO_URL


const dbConnection = async () => {
    try {
        console.log("inside db connection")
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connection established")
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnection