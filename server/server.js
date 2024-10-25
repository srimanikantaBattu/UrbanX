const exp = require("express");
const app = exp();
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(exp.json());

const DB_URL = process.env.DB_URL;

MongoClient.connect(DB_URL)
  .then((client) => {
    const db = client.db("urbanx");
    const usersCollection = db.collection("usersCollection");
    const temporaryCollection = db.collection('temporaryCollection');
    const hospitalsCollection = db.collection('hospitalsCollection');

    app.set('usersObj', usersCollection);
    app.set('temporaryObj', temporaryCollection);
    app.set('hospitalsObj', hospitalsCollection);

    console.log('Connected to database');
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


const userApp = require("./APIs/user-api");
const hospitalApp = require("./APIs/hospital-api");

app.use('/hospital-api', hospitalApp);
app.use('/user-api', userApp);

app.get("/", (req, res) => {
  res.send("Hello urbanx!");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "error", payload: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});