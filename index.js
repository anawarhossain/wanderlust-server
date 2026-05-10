const express = require("express");
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_URI;
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db('wanderlust')
    const destinationCollection = db.collection('destination')

    app.post('/destination',async (req, res) => {
      const destinationData = req.body
      console.log(destinationData)
      const resutl = await destinationCollection.insertOne(destinationData)

      res.json(resutl)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  console.log("Server is running");
  res.send("Server is running properly");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
