const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_PATH);
        console.log("Base Mongo conectada");
    
    } catch(err) {
        console.error(`Error: ${err}`)
    }
})()