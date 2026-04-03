import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables (for local development)
load_dotenv()

# MongoDB URI from environment variables (No hardcoded default for security)
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    # This acts as a fallback for local dev if .env is missing, 
    # but does not expose real credentials.
    MONGO_URI = "mongodb://localhost:27017/ecommerce_db"

# Initialize MongoDB client
mongo_client = MongoClient(MONGO_URI)

# Database Name from environment variables
db_name = os.getenv("MONGO_DB_NAME", "ecommerce_db")
db = mongo_client[db_name]

# Collections
users_collection = db["users"]
products_collection = db["products"]
cart_collection = db["cart"]