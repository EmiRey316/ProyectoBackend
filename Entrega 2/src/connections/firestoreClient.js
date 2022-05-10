const admin = require("firebase-admin");
const serviceAccount = require("../../firebase.json");


(async() => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("Base Firestore conectada");

    } catch (error) {
        console.log("Error al conectarse a la base", error);
    }
})()