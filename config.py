from pymongo import MongoClient

# Replace this with your actual MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://sk:sk@ecommercecluster.zobet.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceCluster"

# Initialize MongoDB client
mongo_client = MongoClient(MONGO_URI)

# Reference to the database
db = mongo_client["ecommerce_db"]

users_collection = db["users"]
products_collection = db["products"]
cart_collection = db["cart"]