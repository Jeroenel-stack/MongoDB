const uri = "mongodb+srv://inventory_admin:Plugitout_10@cluster0.22go2ww.mongodb.net/?appName=Cluster0";

   const client = new MongoClient(uri);

   async function testConnection() {
     try {
       await client.connect();
       console.log("✅ Connected to MongoDB Atlas!");
       
       const db = client.db("inventory_db");
       const collection = db.collection("products");
       
       const count = await collection.countDocuments();
       console.log(`📊 Products collection has ${count} documents`);
       
     } catch (error) {
       console.error("❌ Connection failed:", error);
     } finally {
       await client.close();
     }
   }

   testConnection();