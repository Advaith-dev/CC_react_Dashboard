import { MongoClient, ServerApiVersion } from "mongodb";


const uri = "mongodb+srv://Advaith:Iw49EZs72V5Gpzud@wastebin.3yad3.mongodb.net/?retryWrites=true&w=majority&appName=Wastebin";

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
const collection = client.db("Wastebin").collection("location");

const filter = {id:12334}
const up = {
    $set:{
        name:"updatedName",
        status:"Inactive"
    }
}

const result = await collection.updateOne(filter, up);
console.log(result.acknowledged)