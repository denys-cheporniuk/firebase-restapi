const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const productsRoutes = require("./src/routes/productsRoutes");

const app = express();
app.use(cors({origin: true}));
app.use(productsRoutes);

exports.app = functions.https.onRequest(app);
