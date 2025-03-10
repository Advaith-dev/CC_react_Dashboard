import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import express from "express";

const uri = "mongodb+srv://Advaith:Iw49EZs72V5Gpzud@wastebin.3yad3.mongodb.net/?retryWrites=true&w=majority&appName=Wastebin";

const app = express();
app.use(cors());
app.use(express.json());
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

app.post("/api/write", async (req, res) => {
  try {
    console.log("API /api/write was hit"); 
    const { lat, long, id, name } = req.body;
    console.log("Incoming request body:", req.body); // Debugging log

    if (!lat || !long || !id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const collection = client.db("Wastebin").collection("location");
    const newEntry = { lat, long, id, name,status:"Active", timestamp: new Date() };

    const result = await collection.insertOne(newEntry);
    console.log("Inserted data:", result);

    res.status(201).json({ message: "Data written successfully", data: newEntry });
  } catch (error) {
    console.error("Error writing wastebin data:", error);
    res.status(500).json({ message: "Error writing wastebin data", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
