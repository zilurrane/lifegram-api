const mongoose = require("mongoose");
const readlineSync = require("readline-sync");
require("dotenv/config");
const User = require("../../src/models/user.model.ts");
const userData = require("./users.json");

console.log("START : MongoDB Seeder....");
console.log("This will insert seed data into your database.");
const userWantsToContinue = readlineSync.question('Do you want to continue (y/n)?');

if (userWantsToContinue?.trim()?.toLowerCase() !== "y") {
    console.log("STOP : MongoDB Seeder....");
    console.log("Good Bye!");
    process.exit();
}

const doDataSeeding = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.....!!!!!');

    console.log(userData);

    for(let i = 0; i < userData?.length; i++) {
        const userItem = userData[i];
        await (new User.User(userItem)).save();
    }

}

doDataSeeding().then(() => {
    console.log("COMPLETE : MongoDB Seeder....");
    console.log("Good Bye!");
    process.exit();
}).catch((error) => {
    console.log(error);
    console.log("ERROR : MongoDB Seeder....");
    console.log("Good Bye!");
    process.exit();
});
