const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();
const db = admin.firestore();

router.post("/api/create", async (req, res) => {
  try {
    await db
        .collection("products")
        .doc("/" + req.body.id + "/")
        .create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        });

    return res.status(200).send();
  } catch (error) {
    console.log(error.message);

    return res.status(500).send(error.message);
  }
});

router.get("/api/read", async (req, res) => {
  try {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      console.log("No products");
      return;
    }

    const response = [];

    snapshot.forEach((doc) => {
      response.push(doc.data());
    });

    return res.status(200).send(response);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send(error.message);
  }
});

router.get("/api/read/:id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.id);
    const product = await document.get();
    const response = product.data();

    return res.status(200).send(response);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send(error.message);
  }
});

router.put("/api/update/:id", async (req, res) => {
  try {
    const productsRef = db.collection("products").doc(req.params.id);

    await productsRef.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    return res.status(200).send();
  } catch (error) {
    console.log(error.message);

    return res.status(500).send(error.message);
  }
});

router.delete("/api/delete/:id", async (req, res) => {
  try {
    const productsRef = db.collection("products").doc(req.params.id);
    await productsRef.delete();

    return res.status(200).send();
  } catch (error) {
    console.log(error.message);

    return res.status(500).send(error.message);
  }
});

module.exports = router;
