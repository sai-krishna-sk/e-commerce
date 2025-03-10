from flask import Blueprint, request, jsonify
from bson import ObjectId
from config import products_collection
from middleware import jwt_required, admin_required

products_bp = Blueprint("products", __name__)

# Get all products (Public Access)
@products_bp.route("/products", methods=["GET"])
def get_products():
    products = list(products_collection.find({}, {"_id": 1, "name": 1, "price": 1, "image": 1}))
    for product in products:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string
    return jsonify(products), 200

# Add a new product (Admin Only)
@products_bp.route("/products", methods=["POST"])
@admin_required
def add_product():
    data = request.json
    name = data.get("name")
    price = data.get("price")
    image = data.get("image")

    if not name or not price or not image:
        return jsonify({"error": "Name, price, and image are required"}), 400

    # Check if product already exists
    if products_collection.find_one({"name": name}):
        return jsonify({"error": "Product already exists"}), 400

    new_product = {"name": name, "price": price, "image": image}
    result = products_collection.insert_one(new_product)

    return jsonify({"message": "Product added successfully", "product_id": str(result.inserted_id)}), 201

# Delete a product (Admin Only)
@products_bp.route("/products/<product_id>", methods=["DELETE"])
@admin_required
def delete_product(product_id):
    try:
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return jsonify({"error": "Product not found"}), 404

        products_collection.delete_one({"_id": ObjectId(product_id)})
        return jsonify({"message": "Product deleted successfully"}), 200
    except:
        return jsonify({"error": "Invalid product ID"}), 400
