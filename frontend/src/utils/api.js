// utils/api.js
const API_BASE_URL = "https://e-com-kjm6.onrender.com/api";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid login credentials");
  }

  return response.json();  // returns { access_token, role }
};

export const registerUser = async (userData) => {
  // Always set role as "user" for registration through the frontend
  const userDataWithRole = {
    ...userData,
    role: "user"
  };

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDataWithRole),
  });

  if (!response.ok) {
    // Parse error message from response if available
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const addToCart = async (productId, token) => {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }

  return response.json();
};

export const getCart = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

export const removeFromCart = async (productId, token) => {
  const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove product from cart");
  }

  return response.json();
};

export const addProduct = async (productData, token) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
};

export const deleteProduct = async (productId, token) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
};
