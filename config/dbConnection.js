const mongoose = require('mongoose');
require('dotenv').config();

console.log("Done");
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING,{
                            useNewUrlParser : true,
                            useUnifiedTopology : true,
                            family : 4
                        })
        // console.log(connect.connection.host);
        // console.log(connect.connection.name);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;