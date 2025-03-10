from flask import Blueprint, request, jsonify
from bson import ObjectId
from config import cart_collection, products_collection
from middleware import jwt_required
from flask_jwt_extended import get_jwt_identity

cart_bp = Blueprint("cart", __name__)

# Add product to cart (Authenticated Users Only)
@cart_bp.route("/cart/add", methods=["POST"])
@jwt_required
def add_to_cart():
    data = request.json
    product_id = data.get("product_id")
    user_id = get_jwt_identity()

    # Validate product ID
    try:
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return jsonify({"error": "Product not found"}), 404
    except:
        return jsonify({"error": "Invalid product ID"}), 400

    # Check if product is already in the cart
    existing_cart_item = cart_collection.find_one({"user_id": user_id, "product_id": product_id})
    if existing_cart_item:
        return jsonify({"error": "Product already in cart"}), 400

    # Add to cart
    cart_item = {"user_id": user_id, "product_id": product_id}
    cart_collection.insert_one(cart_item)

    return jsonify({"message": "Product added to cart"}), 201

# Get user's cart (Authenticated Users Only)
@cart_bp.route("/cart", methods=["GET"])
@jwt_required
def get_cart():
    user_id = get_jwt_identity()

    # Fetch cart items for the user
    cart_items = list(cart_collection.find({"user_id": user_id}))
    cart_response = []

    for item in cart_items:
        product = products_collection.find_one({"_id": ObjectId(item["product_id"])}, {"_id": 1, "name": 1, "price": 1, "image": 1})
        if product:
            product["_id"] = str(product["_id"])
            cart_response.append(product)

    return jsonify(cart_response), 200

# Remove product from cart (Authenticated Users Only)
@cart_bp.route("/cart/remove/<product_id>", methods=["DELETE"])
@jwt_required
def remove_from_cart(product_id):
    user_id = get_jwt_identity()

    # Validate product ID
    try:
        cart_item = cart_collection.find_one({"user_id": user_id, "product_id": product_id})
        if not cart_item:
            return jsonify({"error": "Product not found in cart"}), 404
    except:
        return jsonify({"error": "Invalid product ID"}), 400

    # Remove item from cart
    cart_collection.delete_one({"user_id": user_id, "product_id": product_id})
    return jsonify({"message": "Product removed from cart"}), 200
