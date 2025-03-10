from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from config import users_collection
from bson import ObjectId

auth_bp = Blueprint("auth", __name__)

# Register a new user
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")  # Stored as plain text
    role = data.get("role", "user")  # Default role: user

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if user already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400

    # Insert new user
    user = {"username": username, "password": password, "role": role}
    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully"}), 201

# Login and get JWT token
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username, "password": password})

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Create JWT token with user role
    access_token = create_access_token(identity=str(user["_id"]), additional_claims={"role": user["role"]})

    return jsonify({"access_token": access_token, "role": user["role"]}), 200
