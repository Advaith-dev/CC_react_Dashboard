import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import express from "express";

const uri = "mongodb+srv://Advaith:Iw49EZs72V5Gpzud@wastebin.3yad3.mongodb.net/?retryWrites=true&w=majority&appName=Wastebin";

const app = express();
app.use(cors());
const port = 3001;  

// Create a MongoClient instance (keep it open)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Call the connection function once (don't close it)
connectDB();

// Route to fetch wastebin data
app.get("/api/location", async (req, res) => {
  try {
    const collection = client.db("Wastebin").collection("location");
    const bins = await collection.find().toArray();

    console.log("Fetched wastebin data:", bins); // Debugging output
    res.json(bins);
  } catch (error) {
    console.error("Error fetching wastebins:", error);
    res.status(500).json({ message: "Error fetching wastebins", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
