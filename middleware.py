from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

# Middleware to protect routes (authentication required)
def jwt_required(f):
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()  # Verifies JWT is valid
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Unauthorized access"}), 401
    wrapper.__name__ = f.__name__
    return wrapper

# Middleware to restrict access to admins only
def admin_required(f):
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()  # Ensure token is present
            claims = get_jwt()  # Extract claims from JWT
            if claims.get("role") != "admin":
                return jsonify({"error": "Admin access required"}), 403
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Unauthorized access"}), 401
    wrapper.__name__ = f.__name__
    return wrapper
