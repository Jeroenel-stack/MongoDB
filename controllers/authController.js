const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

async function registerUser(username, email, password, firstName, lastName) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("inventory_db");
    const usersCollection = db.collection("Users");
    const existingUser = await usersCollection.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("User already exists");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      username, email, password: hashedPassword, firstName, lastName,
      role: "user", isActive: true, createdAt: new Date(), updatedAt: new Date(), lastLogin: null
    };
    const result = await usersCollection.insertOne(newUser);
    console.log("User registered successfully:", result.insertedId);
    return result.insertedId;
  } finally {
    await client.close();
  }
}

async function loginUser(email, password) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("inventory_db");
    const usersCollection = db.collection("Users");
    const user = await usersCollection.findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    if (!user.isActive) throw new Error("Account is deactivated");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date(), updatedAt: new Date() } }
    );
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  } finally {
    await client.close();
  }
}

module.exports = { registerUser, loginUser };
