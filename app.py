from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import mongo_client
from routes.auth import auth_bp
from routes.products import products_bp
from routes.cart import cart_bp
from config import db
    

# Initialize Flask app
app = Flask(__name__)

# Enable CORS (Allow frontend to communicate with backend)
CORS(app)

# Configure JWT
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key_here"  # Replace with a secure key
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(products_bp, url_prefix="/api")
app.register_blueprint(cart_bp, url_prefix="/api")

# Health check endpoint
@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"message": "E-commerce API is running"}), 200

# Handle 404 errors
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

# Handle 500 errors (Internal Server Errors)
@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "An unexpected error occurred"}), 500

# Start the server
if __name__ == "__main__":
    app.run(debug=True)
