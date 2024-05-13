// db.js
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config');

const mongo_url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const maxRetries = 5;
let retryCount = 0;

const connectWithRetry = async () => {
    while (retryCount < maxRetries) {
        try {
            await mongoose.connect(mongo_url);
            console.log('Successfully connected to MongoDB');
            retryCount = 0; // Reset the retry count after a successful connection
            break; // Exit the loop
        } catch (err) {
            retryCount += 1;
            console.log(
                `MongoDB connection unsuccessful, retrying in 5 seconds... (${retryCount}/${maxRetries})`,
                err
            );
            await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
        }
    }

    if (retryCount === maxRetries) {
        console.error('Max retries reached. Could not connect to MongoDB.');
        process.exit(1); // Exit the process to prevent an infinite loop
    }
};

module.exports = connectWithRetry;
